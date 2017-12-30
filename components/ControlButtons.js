import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { gray, blue } from '../utils/colors'
import PropTypes from 'prop-types'

ControlButtons.propTypes = {
  onPressEdit: PropTypes.func.isRequired,
  onPressAdd: PropTypes.func.isRequired
}

export default function ControlButtons(props) {
  return (
    <View style={styles.buttonsContainer}>
      <Icon
        raised
        color={gray}
        name='pencil'
        type='font-awesome'
        onPress = {props.onPressEdit}
      />
      <Icon
        raised
        color={blue}
        name='add-to-photos'
        onPress = {props.onPressAdd}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    position:'absolute',
    right:20,
    bottom:20,
    zIndex:0.5
  }
})
