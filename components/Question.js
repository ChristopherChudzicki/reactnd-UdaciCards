import React, {Component} from 'react'
import { Button } from 'react-native-elements'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
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
      large
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
    onMarkCorrect: PropTypes.func.isRequired,
    onMarkIncorrect: PropTypes.func.isRequired,
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
      onMarkCorrect,
      onMarkIncorrect
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
        <View style={styles.buttonsContainer}>
          <View style={styles.graderButtons}>
            {showAnswer &&
              <BigButton
                title='Yes'
                backgroundColor={blue}
                onPress={onMarkCorrect}
              />
            }
            {showAnswer &&
              <BigButton
                title='No'
                backgroundColor={orange}
                onPress={onMarkIncorrect}
              />
            }
          </View>
          <View style={{flex:1}}>
            <BigButton
              title='Toggle Answer'
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
  buttonsContainer: {
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
    width:125,
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
