import React from 'react'
import { StyleSheet } from 'react-native'
// import SimpleModal from 'react-native-simple-modal';
import { Modal, View } from 'react-native'
import PropTypes from 'prop-types'

MyModal.propTypes = {
  children: PropTypes.any
}

export default function MyModal(props){
  return (
    <Modal
      {...props}
      modalStyle={styles.modal}
      transparent={true}
      animationType='fade'
    >
      <View style={styles.modalBackground}>
        {props.children}
      </View>
    </Modal>
  )
}

const styles=StyleSheet.create({
  modalBackground: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingLeft:30,
    paddingRight:30
  }
})
