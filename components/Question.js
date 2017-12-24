import React, {Component} from 'react'
import { Button } from 'react-native-elements'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { gray, blue, orange, darkBlue } from '../utils/colors'
import PropTypes from 'prop-types'
import FlashCard from './FlashCard'

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

export default class Question extends Component {

  static propTypes = {
    onMarkQuestionCorrect: PropTypes.func.isRequired,
    onMarkQuestionIncorrect: PropTypes.func.isRequired,
    questionText: PropTypes.string.isRequired,
    answerText: PropTypes.string.isRequired,
    numberIs: PropTypes.number.isRequired,
    numberTotal: PropTypes.number.isRequired,
  }

  state = {
    showAnswer: false
  }

  toggleAnswer = () => {
    this.setState( state => ({showAnswer:!state.showAnswer}) )
  }

  render(){
    const {
      numberIs,
      numberTotal,
      questionText,
      answerText,
      onMarkQuestionCorrect,
      onMarkQuestionIncorrect
    } = this.props

    const { showAnswer } = this.state

    return (
      <View style={styles.fullContainer}>
        <FlashCard
          title={`Question ${numberIs} of ${numberTotal}`}
          body={questionText}
        />
        <View style={styles.fullContainer}>
          {showAnswer &&
            <FlashCard
              title='Answer'
              body={answerText}
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
              onPress={onMarkQuestionCorrect}
            />
            <BigButton
              title='No'
              backgroundColor={orange}
              onPress={onMarkQuestionIncorrect}
            />
          </View>
          <View style={{flex:1}}>
            <Button
              title={showAnswer ? 'Hide Answer' : 'Show Answer'}
              textStyle={styles.toggleText}
              backgroundColor={darkBlue}
              onPress={this.toggleAnswer}
            />
          </View>
        </View>
      </View>
    )
  }
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
    marginLeft:10,
    marginRight:10
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
