import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Modal from './Modal'
import { white, gray, darkGray, blue } from '../utils/colors'
import PropTypes from 'prop-types'

ConfirmationModal.propTypes={
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default function ConfirmationModal(props){
  return (
    <Modal visible={props.isVisible} closeOnTouchOutside={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.message}>{props.message}</Text>
        <View style={styles.footer}>
          <Button
            title='Cancel'
            large
            component={TouchableOpacity}
            backgroundColor={gray}
            textStyle={styles.buttonText}
            containerViewStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            onPress={props.onCancel}
          />
          <Button
            title='Confirm'
            large
            Component={TouchableOpacity}
            backgroundColor={blue}
            textStyle={styles.buttonText}
            containerViewStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            onPress={props.onConfirm}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor:white,
    padding:4,
    minHeight:150
  },
  title:{
    fontSize:24,
    fontWeight:'600',
    color:darkGray,
    textAlign:'center'
  },
  message: {
    fontSize:14,
    marginLeft:8,
    marginRight:8,
    color: darkGray
  },
  footer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignSelf:'stretch',
  },
  buttonContainer: {
    flex:1,
    marginLeft:0,
    marginRight:0
  },
  button: {
    // flex:1,
    height:50,
    margin:0
  },
  buttonText:{
    color:white,
    fontWeight:'900'
  }
})
