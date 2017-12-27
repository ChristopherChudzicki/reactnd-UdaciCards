import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import QuizCardContainer from '../containers/QuizCardContainer'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'

import QuizSummaryContainer from './QuizSummaryContainer'

class QuizContentView extends Component {

  state = {
  }

  static propTypes = {
    orderedIdList: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title
  })

  swipeNext = ()=>{
    this._swiper.scrollBy(1)
  }

  render(){
    const { orderedIdList } = this.props
    return (
      <Swiper
        loop={false}
        ref={(swiper) => { this._swiper = swiper }}
        showsButtons={true}
        loadMinimal={true}
        nextButton={<Icon size={36} name='chevron-right'/>}
        prevButton={<Icon size={36} name='chevron-left'/>}
        showsPagination={false}>
        {orderedIdList.map((id, index) => {
          return (
            <QuizCardContainer
              key={index}
              id={id}
              index={index}
              numTotal={orderedIdList.length}
              showNextCard={ this.swipeNext }
            />
          )
        }).concat(
          // This gets QuizSummary as last page in swiper.
          [<QuizSummaryContainer
            key={orderedIdList.length}
            navigation={this.props.navigation}
           />]
        )
        }
      </Swiper>
    )
  }
}

const mapStateToProps = ({decks, quiz}) => {
  const { defaultOrder } = decks[quiz.activeDeckId] // array of ids
  const { order } = quiz
  return {
    orderedIdList:  order.map(value => defaultOrder[value])
  }
}


export default connect(mapStateToProps)(QuizContentView)
