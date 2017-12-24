import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Question from '../components/Question'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
import shuffle from 'shuffle-array'
import { submitQuestionScore } from '../actions/quiz'
import QuizSummary from './QuizSummary'

class QuizContentView extends Component {

  state = {
  }

  static propTypes = {
    questions: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    submitQuestionScore: PropTypes.func.isRequired
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title
  })

  render(){
    const { questions, order, grades } = this.props
    return (
      <View style={{flex:1}}>
        <Swiper
          showsButtons={true}
          loadMinimal={true}
          showsPagination={false}>
          {order.map((id, index) => {
            const {question, answer} = questions[id]
            return (
              <Question
                key={id}
                questionText={question}
                answerText={answer}
                numberIs={index}
                numberTotal={order.length}
                onMarkQuestionCorrect={()=>this.props.submitQuestionScore({id, isCorrect:true})}
                onMarkQuestionIncorrect={()=>this.props.submitQuestionScore({id, isCorrect:false})}
              />
            )
          })}
        </Swiper>
      </View>
    )
  }
}

const mapStateToProps = ({decks, quiz}) => {

  const {questions, order} = decks[quiz.activeDeckId]
  return {
    questions,
    order: quiz.isRandomOrder ? shuffle(order, {copy:true}) : order,
  }
}

const mapDispatchToProps = {
  submitQuestionScore: submitQuestionScore
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizContentView)
