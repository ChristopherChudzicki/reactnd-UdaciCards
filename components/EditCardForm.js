import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet } from 'react-native'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { white, blue, darkGray } from '../utils/colors'
import UpperRightCloseButton from './UpperRightCloseButton'
import PropTypes from 'prop-types'
import { uuid } from 'lodash-uuid'

export default class EditCardForm extends Component {

  static propTypes = {
    onPressSubmit: PropTypes.func.isRequired,
    onPressCancel: PropTypes.func.isRequired,
    deckId: PropTypes.string.isRequired,
    cardId: PropTypes.string,
    title: PropTypes.string.isRequired,
    submitLabel:PropTypes.string.isRequired,
    initialQuestion: PropTypes.string.isRequired,
    initialAnswer: PropTypes.string.isRequired,
  }

  state = {
    question: '',
    answer: '',
    isQuestionErrorVisible:false,
    isAnswerErrorVisible:false,
  }

  componentDidMount = ()=>{
    this._questionInput.focus()
    this.setState({
      question: this.props.initialQuestion,
      answer: this.props.initialAnswer
    })
  }

  submitHandler = () => {
    const isQuestionErrorVisible = this.state.question === ''
    const isAnswerErrorVisible = this.state.answer === ''
    this.setState({isQuestionErrorVisible, isAnswerErrorVisible})
    if (isQuestionErrorVisible){
      this._questionInput.shake()
    }
    if (isAnswerErrorVisible){
      this._answerInput.shake()
    }
    if (!isAnswerErrorVisible && !isQuestionErrorVisible){
      this.props.onPressSubmit({
        question: this.state.question,
        answer: this.state.answer,
        deckId: this.props.deckId,
        cardId: this.props.cardId ? this.props.cardId : uuid()
      })
      this.props.onPressCancel()
    }

  }

  render(){
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={65}
        behavior='position'
        style={styles.container}
      >
        <Text style={styles.title}>{this.props.title}</Text>
        <UpperRightCloseButton onPress={this.props.onPressCancel}/>
        <FormLabel>Question Text</FormLabel>
        <FormInput
          ref={input => this._questionInput = input}
          value={this.state.question}
          onChangeText={text => this.setState({question:text})}
        />
        {this.state.isQuestionErrorVisible &&
          <FormValidationMessage>
            Question cannot be empty
          </FormValidationMessage>
        }
        <FormLabel>Answer Text</FormLabel>
        <FormInput
          ref={input => this._answerInput = input}
          value={this.state.answer}
          onChangeText={text => this.setState({answer:text})}
        />
        {this.state.isAnswerErrorVisible &&
          <FormValidationMessage>
            Answer cannot be empty
          </FormValidationMessage>
        }
        <Button
          containerViewStyle={styles.buttonContainerStyle}
          buttonStyle={styles.button}
          title={this.props.submitLabel}
          onPress={this.submitHandler}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor:white
  },
  title:{
    fontSize:24,
    color:darkGray,
    margin:2,
    textAlign:'center'
  },
  button: {
    backgroundColor: blue,
  },
  buttonContainerStyle:{
    margin:10
  }
})
