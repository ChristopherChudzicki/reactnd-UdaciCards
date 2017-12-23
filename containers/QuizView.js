import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Question from '../components/Question'
import MenuBar from '../components/MenuBar'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'

class QuizView extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    questions: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
  }



  render(){
    const { questions, order, title, navigation } = this.props

    return (
      <View style={{flex:1}}>
        <MenuBar
          title={title}
          onPressRight={()=>navigation.navigate('Home')}
        />
        <Swiper
          showsButtons={true}
          loadMinimal={true}
          showsPagination={false}
          onChangeIndexChanged={this.handleIndexChanged}>
          {order.map((id, index) => {
            const {question, answer} = questions[id]
            return (
              <Question
                key={id}
                questionText={question}
                answerText={answer}
                showAnswer={true}
                numberIs={index}
                numberTotal={Object.keys(questions).length}
                onMarkCorrect={(id)=>{alert(`Mark ${id} Correct`)}}
                onMarkIncorrect={(id)=>{alert(`Mark ${id} Incorrect`)}}
              />
            )
          })}
        </Swiper>
      </View>
    )
  }
}

const mapStateToProps = ({decks, quiz}) => {

  const deck = quiz.activeDeckId ? decks[quiz.activeDeckId] : {}

  const {questions, order, title} = deck
  return {
    title,
    questions,
    order
  }
}

export default connect(mapStateToProps)(QuizView)
