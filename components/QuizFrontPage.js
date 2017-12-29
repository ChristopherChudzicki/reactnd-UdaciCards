import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Icon, CheckBox } from 'react-native-elements'
import PropTypes from 'prop-types'
import { white, blue, lightGray, darkGray } from '../utils/colors'

QuizFrontPage.propTypes = {
  title: PropTypes.string.isRequired,
  onToggleRandomizeQuizOrder: PropTypes.func.isRequired,
  isRandomOrder: PropTypes.bool.isRequired,
  onPressStart: PropTypes.func.isRequired,
  onPressAddCard: PropTypes.func.isRequired,
  onPressEditQuiz: PropTypes.func.isRequired,
  numTotal: PropTypes.number.isRequired
}

export default function QuizFrontPage(props){
  const isStartDisabled = props.numTotal===0
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
      <View>
        <Button
          large
          raised
          disabled={isStartDisabled}
          title='Start Quiz'
          Component={TouchableOpacity}
          textStyle={{color:white, fontSize:24, fontWeight:'800'}}
          backgroundColor={blue}
          onPress={props.onPressStart}
        />
        {isStartDisabled &&
          <View style={styles.warningContainer}>
            <Icon name='warning' iconStyle={styles.warningIcon}/>
            <Text style={styles.warningText}>
              Add a question card before starting the quiz.
            </Text>
          </View>
        }
      </View>
      <View style={styles.optionsContainer}>
        <Button
          raised
          title='Add New Card'
          Component={TouchableOpacity}
          containerViewStyle={styles.controlButton}
          textStyle={styles.controlButtonText}
          backgroundColor={lightGray}
          onPress={props.onPressAddCard}
        />
        <Button
          raised
          title='Edit Cards'
          Component={TouchableOpacity}
          containerViewStyle={styles.controlButton}
          textStyle={styles.controlButtonText}
          backgroundColor={lightGray}
          onPress={props.onPressEditQuiz}
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
  },
  controlButton: {
    margin:3
  },
  controlButtonText: {
    fontSize:16,
     color:darkGray
   },
  warningContainer:{
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'flex-start',
    marginLeft:10,
    marginRight:10,
    marginTop:4,
    marginBottom:4
  },
  warningIcon: {
    color: darkGray
  },
  warningText: {
    color:darkGray,
    fontSize:14
  }
})
