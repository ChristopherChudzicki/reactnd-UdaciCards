import React from 'react'
import { Card, Button } from 'react-native-elements'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { gray, blue, orange } from '../utils/colors'
import PropTypes from 'prop-types'

Question.propTypes = {
  onMarkCorrect: PropTypes.func.isRequired,
  onMarkIncorrect: PropTypes.func.isRequired,
  questionText: PropTypes.string.isRequired,
  numberIs: PropTypes.number.isRequired,
  numberTotal: PropTypes.number.isRequired,
}

export default function Question(props){
  return (
    <View style={styles.container}>
      <Card
        title={`Question ${props.numberIs} of ${props.numberTotal}`}
        titleStyle={styles.title}
        containerStyle={styles.cardOuterContainer}
        wrapperStyle={styles.cardInnerContainer}
      >
        <View style={{flex:1, justifyContent:'center'}}>
          <Text style={styles.question}>
            {props.questionText}
          </Text>
        </View>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          large
          raised
          title='Yes'
          style={styles.grader}
          textStyle={styles.graderText}
          backgroundColor={blue}
          Component={TouchableOpacity}
          onPress={props.onMarkCorrect}
        />
        <Button
          large
          raised
          title='Yes'
          style={styles.grader}
          textStyle={styles.graderText}
          backgroundColor={orange}
          Component={TouchableOpacity}
          onPress={props.onMarkIncorrect}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  title: {
    color:gray,
    fontSize:16,
  },
  question: {
    fontSize:24,
    textAlign:'center',
  },
  cardOuterContainer: {
    flex:2,
  },
  cardInnerContainer: {
    flex:1,
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  grader: {
    width:125,
  },
  graderText: {
    fontWeight: '800',
    fontSize: 24
  }
})
