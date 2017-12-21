import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Question from '../components/Question'
import MenuBar from '../components/MenuBar'

class QuizView extends Component {

  render(){
    return (
      <View style={{flex:1}}>
        <MenuBar title="Home" />
        <Question
          questionText={'Hello'}
          numberIs={3}
          numberTotal={5}
          onMarkCorrect={()=>{alert("Correct!")}}
          onMarkIncorrect={()=>{alert("Incorrect!")}}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deck: state.decks[state.quiz.activeDeckId],
    questionIdx: state.quiz.activeQuestionIdx
  }
}

export default connect(mapStateToProps)(QuizView)
