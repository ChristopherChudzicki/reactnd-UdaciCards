import React from 'react'
import { StyleSheet } from 'react-native'
import SimpleModal from 'react-native-simple-modal';

export default function Modal(props){
  return (
    <SimpleModal
      {...props}
      modalStyle={styles.modal}>
    </SimpleModal>
  )
}

const styles=StyleSheet.create({
  modal: {
    margin:30,
    padding:0
  }
})
