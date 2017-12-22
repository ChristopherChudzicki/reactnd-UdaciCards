import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Question from '../components/Question'
import MenuBar from '../components/MenuBar'
import PropTypes from 'prop-types'

class QuizView extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    questions: PropTypes.object.isRequired,
    activeQuestionIndex: PropTypes.number.isRequired,
    order: PropTypes.array.isRequired
  }

  render(){
    const {activeQuestionIndex, questions, order, title} = this.props

    const {question, answer} = questions[order[activeQuestionIndex]]

    return (
      <View style={{flex:1}}>
        <MenuBar title={title} />
        <Question
          questionText={question}
          answerText={answer}
          showAnswer={true}
          numberIs={activeQuestionIndex}
          numberTotal={Object.keys(questions).length}
          onMarkCorrect={()=>{alert("Correct!")}}
          onMarkIncorrect={()=>{alert("Incorrect!")}}
        />
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
    order,
    activeQuestionIndex: quiz.activeQuestionIndex
  }
}

export default connect(mapStateToProps)(QuizView)
