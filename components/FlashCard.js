import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'
import { gray } from '../utils/colors'
import PropTypes from 'prop-types'

FlashCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string.isRequired
}

export default function FlashCard (props){
  return (
    <Card
      title={props.title}
      titleStyle={styles.title}
      containerStyle={styles.cardOuterContainer}
      wrapperStyle={styles.cardInnerContainer}>
      <View style={styles.fullSpaced}>
        <Text style={styles.cardText}>
          {props.body}
        </Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardOuterContainer:{
    flex:1,
  },
  cardInnerContainer: {
    flex:1,
    justifyContent: 'center'
  },
  title: {
    color:gray,
    fontSize:16,
  },
  cardText: {
    fontSize:24,
    textAlign:'center',
  },
  fullSpaced: {
    flex:1,
    justifyContent: 'space-around'
  }
})
