import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { lightGray, darkGray } from '../utils/colors'


UpperRightCloseButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default function UpperRightCloseButton({onPress}) {
  return (
    <Icon
      name='times'
      type='font-awesome'
      containerStyle={styles.container}
      iconStyle={styles.button}
      onPress={onPress}
    />
  )
}

const CANCEL_WH = 30;

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    backgroundColor:lightGray,
    borderRadius:CANCEL_WH/2,
    width:CANCEL_WH,
    height:CANCEL_WH,
    right:-CANCEL_WH/2,
    top:-CANCEL_WH/2,
  },
  button: {
    color:darkGray
  }
})
