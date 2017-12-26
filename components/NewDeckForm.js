import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet } from 'react-native'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { white, blue, darkGray } from '../utils/colors'
import UpperRightCloseButton from './UpperRightCloseButton'
import PropTypes from 'prop-types'


export default class AddDeckForm extends Component {

  static propTypes = {
    onPressSubmit: PropTypes.func.isRequired,
    onPressCancel: PropTypes.func.isRequired
  }

  componentDidMount = ()=>{
    this._input.focus()
  }

  state = {
    name: '',
    isNameErrorVisible:false
  }

  submitHandler = () => {
    const isNameErrorVisible = this.state.name === ''
    this.setState({isNameErrorVisible})
    if (isNameErrorVisible){
      this._input.shake()
    }
    else {
      this.props.onPressSubmit(this.state.name)
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
        <Text style={styles.title}>New Deck</Text>
        <UpperRightCloseButton onPress={this.props.onPressCancel}/>
        <FormLabel>Deck Name</FormLabel>
        <FormInput
          ref={input => this._input = input}
          value={this.state.name}
          onChangeText={text => this.setState({name:text})}
        />
        {
          this.state.isNameErrorVisible &&
          <FormValidationMessage>
            Deck name cannot be empty
          </FormValidationMessage>
        }
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin:20,
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
