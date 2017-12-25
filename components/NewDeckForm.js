import React, { Component } from 'react'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import { Button, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { white, blue, lightGray, darkGray } from '../utils/colors'
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
    hasSubmitted:false
  }

  validateDeckName = () => {
    return this.state.name != ''
  }

  submitHandler = () => {
    this.setState({hasSubmitted:true})
    if (!this.validateDeckName()){
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
      >
        <View style={styles.container}>
          <Icon
            name='times'
            type='font-awesome'
            containerStyle={styles.cancelContainer}
            iconStyle={styles.cancelIcon}
            onPress={this.props.onPressCancel}
          />
          <FormLabel>Deck Name</FormLabel>
          <FormInput
            ref={input => this._input = input}
            value={this.state.name}
            onChangeText={text => this.setState({name:text})}
          />
          {
            this.state.hasSubmitted && !this.validateDeckName() &&
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
        </View>
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
  button: {
    backgroundColor: blue,
  },
  buttonContainerStyle:{
    margin:10
  }
})
