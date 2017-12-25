import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { blue } from '../utils/colors'

export default function AddDeckButton() {
  return (
    <View style={styles.button}>
      <Icon
        raised
        color={blue}
        name='add-to-photos'
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
