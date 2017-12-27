import React from 'react'
import { Button } from 'react-native-elements'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import {
  blue,
  darkBlue,
  orange,
  gray,
  } from '../utils/colors'
import PropTypes from 'prop-types'
import CardSide from './CardSide'

BigButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
}
function BigButton(props){
  return (
    <Button
      raised
      title={props.title}
      style={styles.button}
      textStyle={styles.graderText}
      backgroundColor={props.backgroundColor}
      Component={TouchableOpacity}
      onPress={props.onPress}
    />
  )
}

QuizCard.propTypes = {
  onMarkCorrect: PropTypes.func.isRequired,
  onMarkIncorrect: PropTypes.func.isRequired,
  questionText: PropTypes.string.isRequired,
  answerText: PropTypes.string.isRequired,
  numberIs: PropTypes.number.isRequired,
  numberTotal: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  isAnswerVisible: PropTypes.bool.isRequired,
  onToggleAnswerVisibility: PropTypes.func.isRequired
}

export default function QuizCard(props){

  const {
    numberIs,
    numberTotal,
    questionText,
    answerText,
    onMarkCorrect,
    onMarkIncorrect,
    isAnswerVisible,
    onToggleAnswerVisibility,
    backgroundColor
  } = props

  return (
    <View style={styles.fullContainer}>
      <CardSide
        title={`Question ${numberIs} of ${numberTotal}`}
        body={questionText}
        backgroundColor={backgroundColor}
      />
      <View style={styles.fullContainer}>
        {isAnswerVisible &&
          <CardSide
            title='Answer'
            body={answerText}
            backgroundColor={backgroundColor}
          />
        }
      </View>
      <View style={styles.controlsContainer}>
        <View>
          <Text style={styles.graderPrompt}>Know it?</Text>
        </View>
        <View style={styles.graderButtons}>
          <BigButton
            title='Yes'
            backgroundColor={blue}
            onPress={onMarkCorrect}
          />
          <BigButton
            title='No'
            backgroundColor={orange}
            onPress={onMarkIncorrect}
          />
        </View>
        <View style={{flex:1}}>
          <Button
            title={isAnswerVisible ? 'Hide Answer' : 'Show Answer'}
            textStyle={styles.toggleText}
            backgroundColor={darkBlue}
            onPress={onToggleAnswerVisibility}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fullContainer:{
    flex:1,
  },
  title: {
    color:gray,
    fontSize:16,
  },
  smallLabel: {
    fontSize:16,
    color: gray
  },
  mainText: {
    fontSize:24,
    textAlign:'center',
  },
  cardInnerContainer: {
    flex:1,
    justifyContent: 'center'
  },
  fullSpaced: {
    flex:1,
    justifyContent: 'space-around'
  },
  controlsContainer: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  graderButtons: {
    flexDirection: 'row',
    flex:1,
    alignItems:'center'
  },
  button: {
    minWidth:125,
  },
  graderPrompt:{
    fontSize:18,
    marginTop:10
  },
  graderText: {
    fontWeight: '800',
    fontSize: 24
  },
  toggleText: {
    fontWeight: '600',
    fontSize: 18
  }
})
