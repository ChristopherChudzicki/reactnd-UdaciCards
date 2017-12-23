import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import PropTypes from 'prop-types'
import { black, white, blue, lightGray, darkGray } from '../utils/colors'

QuizFrontPage.propTypes = {
  title: PropTypes.string.isRequired,
  onToggleRandomizeQuizOrder: PropTypes.func.isRequired,
  isRandomOrder: PropTypes.bool.isRequired,
  onPressStart: PropTypes.func.isRequired,
  onPressAddCard: PropTypes.func.isRequired,
  numTotal: PropTypes.number.isRequired
}

export default function QuizFrontPage(props){
  return (
    <View style={styles.fullContainer}>
      <View>
        <Text style={styles.title}>
          {props.title}
        </Text>
        <Text style={styles.subTitle}>
          {props.numTotal} Questions
        </Text>
      </View>
      <Button
        large
        raised
        title='Start Quiz'
        Component={TouchableOpacity}
        textStyle={{color:white, fontSize:24, fontWeight:'800'}}
        backgroundColor={blue}
        onPress={props.onPressStart}
      />
      <View style={styles.optionsContainer}>
        <Button
          raised
          title='Add Question'
          Component={TouchableOpacity}
          textStyle={{fontSize:16, color:black}}
          backgroundColor={lightGray}
          onPress={props.onPressAddCard}
        />
        <CheckBox
          center
          title='Randomize Order'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={props.isRandomOrder}
          onPress={props.onToggleRandomizeQuizOrder}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fullContainer: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    fontSize:32,
    fontWeight:'800',
    textAlign:'center'
  },
  subTitle: {
    fontSize:18,
    color:darkGray,
    textAlign:'center'
  }
})
