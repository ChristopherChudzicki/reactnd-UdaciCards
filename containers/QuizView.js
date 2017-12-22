import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ActivityIndicator } from 'react-native'
import Question from '../components/Question'
import MenuBar from '../components/MenuBar'

class QuizView extends Component {

  showLoading(){
    return (
      <View style={{flex:1}}>
        <ActivityIndicator />
      </View>
    )
  }

  render(){
    const {activeQuestionIndex, questions, order, title} = this.props

    if (!questions){
      return this.showLoading()
    }

    const question = questions[order[activeQuestionIndex]]

    return (
      <View style={{flex:1}}>
        <MenuBar title={title} />
        <Question
          questionText={question.question}
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
