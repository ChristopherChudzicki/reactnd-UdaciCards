import React from 'react'
import { fetchDecksAsync } from '../utils/api'
import styled from 'styled-components/native'

// Temporary
import MenuBar from '../components/MenuBar'
import Question from '../components/Question'
import DeckSummaries from '../components/DeckSummaries'

const MainView = styled.View`
  flex:1;
`

export default class Main extends React.Component {

  state = {
    decks: [
      {id: 'id0', title: "Title 0", numQuestions:6},
      {id: 'id1', title: "Title 1", numQuestions:4},
      {id: 'id2', title: "Title 2", numQuestions:7},
      {id: 'id3', title: "Title 3", numQuestions:8}
    ]
  }

  componentDidMount(){
    fetchDecksAsync()
  }


  render() {

    return (
      <MainView>
        <MenuBar title='My Title'/>
        {/* <Question
          questionText={'Hello'}
          numberIs={3}
          numberTotal={5}
          onMarkCorrect={()=>{alert("Correct!")}}
          onMarkIncorrect={()=>{alert("Incorrect!")}}
        /> */}
        <DeckSummaries decks={this.state.decks} />
      </MainView>
    );
  }
}
