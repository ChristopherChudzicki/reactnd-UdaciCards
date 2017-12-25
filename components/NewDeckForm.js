import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { white, lightGray, darkGray } from '../utils/colors'
import PropTypes from 'prop-types'

export default class AddDeckForm extends Component {

  static propTypes = {
    onPressSubmit: PropTypes.func.isRequired,
    onPressCancel: PropTypes.func.isRequired
  }

  state = {
    name: ''
  }

  render(){
    return (
      <View style={styles.container}>
        <Icon
          name='times'
          type='font-awesome'
          containerStyle={styles.cancelContainer}
          iconStyle={styles.cancelIcon}
          onPress={this.props.onPressCancel}
        />
        <FormLabel>Deck Name</FormLabel>
        <FormInput />
        <FormValidationMessage>Deck name cannot be empty</FormValidationMessage>
      </View>
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
  }
})
