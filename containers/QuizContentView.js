import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionContainer from '../containers/QuestionContainer'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
import shuffle from 'shuffle-array'

// import QuizSummary from './QuizSummary'

class QuizContentView extends Component {

  state = {
  }

  static propTypes = {
    order: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title
  })

  handleAfterPressGrade = ()=>{
    this._swiper.scrollBy(1)
  }

  render(){
    const { order } = this.props
    return (
      <Swiper
        ref={(swiper) => { this._swiper = swiper }}
        showsButtons={true}
        loadMinimal={true}
        showsPagination={false}>
        {order.map((id, index) => {
          return (
            <QuestionContainer
              key={index}
              id={id}
              index={index}
              numTotal={order.length}
              afterPressGrade={ this.handleAfterPressGrade }
            />
          )
        })}
      </Swiper>
    )
  }
}

const mapStateToProps = ({decks, quiz}) => {
  const { order } = decks[quiz.activeDeckId]
  return {
    order: quiz.isRandomOrder ? shuffle(order, {copy:true}) : order,
  }
}


export default connect(mapStateToProps)(QuizContentView)
