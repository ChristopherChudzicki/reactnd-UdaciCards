import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { blue } from '../utils/colors'
import PropTypes from 'prop-types'

AddDeckButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default function AddDeckButton(props) {
  return (
    <View style={styles.button}>
      <Icon
        raised
        color={blue}
        name='add-to-photos'
        onPress = {props.onPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginRight:20,
    alignSelf:'flex-end',
    marginBottom:20
  }
})
