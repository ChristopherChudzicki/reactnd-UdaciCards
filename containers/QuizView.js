import React, { Component } from 'react'
import { View } from 'react-native'
import Question from '../components/Question'
import MenuBar from '../components/MenuBar'

class QuizView extends Component {
  state = {
    decks: [
      {id: 'id0', title: "Title 0", numQuestions:6},
      {id: 'id1', title: "Title 1", numQuestions:4},
      {id: 'id2', title: "Title 2", numQuestions:7},
      {id: 'id3', title: "Title 3", numQuestions:8}
    ]
  }

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

export default QuizView
