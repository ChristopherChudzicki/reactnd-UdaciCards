import React from 'react'
import { View } from 'react-native'
import { fetchDecksAsync } from '../utils/api'
import UdaciStatusBar from '../components/UdaciStatusBar'
import styled from 'styled-components/native'

// Temporary
import Question from '../components/Question'

const MainView = styled.View`
  flex:1;
`

export default class Main extends React.Component {

  componentDidMount(){
    fetchDecksAsync()
  }


  render() {

    return (
      <MainView>
        <UdaciStatusBar />
        <Question
          questionText={'Hello'}
          onMarkCorrect={()=>{alert("Correct!")}}
          onMarkIncorrect={()=>{alert("Incorrect!")}}
        />
      </MainView>
    );
  }
}
