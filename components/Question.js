import React from 'react'
import { Text } from 'react-native'
import styled from "styled-components/native";
import { lightBlue, lightOrange, lightGray } from '../utils/colors'
import { Button } from './helpers'
import PropTypes from 'prop-types'

const QuestionContainer = styled.View`
  align-items:center;
  justify-content:space-around;
  flex:1;
`

const PromptCard = styled.View`
  background-color:${lightGray};
  border-radius:5px;
  align-self:stretch;
  align-items:center;
  justify-content:center;
  margin:20px;
  flex:2;
`

const Grader = styled.View`
  flex:1;
`
const GraderPrompt = styled.View`
  margin:5px;
`
const GraderButtonHolder = styled.View`
  flex-direction:row;
`


export default function Question (props) {
  return (
    <QuestionContainer>
      <PromptCard>
        <Text style={{fontSize:24}}>
          {props.questionText}
        </Text>
      </PromptCard>
      <Grader>
        <GraderPrompt>
          <Text>Correct?</Text>
        </GraderPrompt>
        <GraderButtonHolder>
          <Button backgroundColor={lightBlue} onPress={props.onMarkCorrect}>
            <Text style={{fontSize:30}}>Yes</Text>
          </Button>
          <Button backgroundColor={lightOrange} onPress={props.onMarkIncorrect}>
            <Text style={{fontSize:30}}>No</Text>
          </Button>
        </GraderButtonHolder>
      </Grader>
    </QuestionContainer>
  )
}

Question.propTypes = {
  onMarkCorrect: PropTypes.func.isRequired,
  onMarkIncorrect: PropTypes.func.isRequired,
  questionText: PropTypes.string.isRequired,
}
