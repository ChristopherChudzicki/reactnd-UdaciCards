import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet } from 'react-native'
import { Button, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { white, blue, lightGray, darkGray } from '../utils/colors'
import PropTypes from 'prop-types'

export default class AddCardForm extends Component {

  static propTypes = {
    onPressSubmit: PropTypes.func.isRequired,
    onPressCancel: PropTypes.func.isRequired
  }

  componentDidMount = ()=>{
    this._questionInput.focus()
  }

  state = {
    question: '',
    answer: '',
    hasSubmitted:false
  }

  submitHandler = () => {
    this.setState({hasSubmitted:true})
    this.props.onPressSubmit({
      question: this.state.question,
      answer: this.state.answer
    })
  }

  render(){
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={65}
        behavior='position'
        style={styles.container}
      >
        <Text style={styles.title}>New Card</Text>
        <Icon
          name='times'
          type='font-awesome'
          containerStyle={styles.cancelContainer}
          iconStyle={styles.cancelIcon}
          onPress={this.props.onPressCancel}
        />
        <FormLabel>Question Text</FormLabel>
        <FormInput
          ref={input => this._questionInput = input}
          value={this.state.question}
          onChangeText={text => this.setState({question:text})}
        />
        <FormValidationMessage>
          Question cannot be empty
        </FormValidationMessage>
        <FormLabel>Answer Text</FormLabel>
        <FormInput
          ref={input => this._answerInput = input}
          value={this.state.answer}
          onChangeText={text => this.setState({answer:text})}
        />
        <FormValidationMessage>
          Answer cannot be empty
        </FormValidationMessage>
        <Button
          containerViewStyle={styles.buttonContainerStyle}
          buttonStyle={styles.button}
          title='Create'
          onPress={this.submitHandler}
        />
      </KeyboardAvoidingView>
    )
  }
}

const CANCEL_WH = 30

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin:20,
    backgroundColor:white
  },
  cancelContainer: {
    position:'absolute',
    backgroundColor:lightGray,
    borderRadius:CANCEL_WH/2,
    width:CANCEL_WH,
    height:CANCEL_WH,
    right:-CANCEL_WH/2,
    top:-CANCEL_WH/2,
  },
  cancelIcon: {
    color:darkGray
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
