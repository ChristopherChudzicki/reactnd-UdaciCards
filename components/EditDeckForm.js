import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet } from 'react-native'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { white, blue, darkGray } from '../utils/colors'
import UpperRightCloseButton from './UpperRightCloseButton'
import PropTypes from 'prop-types'
import { uuid } from 'lodash-uuid'

export default class EditDeckForm extends Component {

  static propTypes = {
    onPressSubmit: PropTypes.func.isRequired,
    onPressCancel: PropTypes.func.isRequired,
    deckId: PropTypes.string,
    title: PropTypes.string.isRequired,
    initialName: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired
  }

  static defaultProps = {
    initialName: ''
  }

  componentDidMount = ()=>{
    this._input.focus()
    this.setState({name: this.props.initialName})
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
      this.props.onPressSubmit({
        title: this.state.name,
        deckId: this.props.deckId ? this.props.deckId : uuid()
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
        <Text style={styles.title}>
          {this.props.title}
        </Text>
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
