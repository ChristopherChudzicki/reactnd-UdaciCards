import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Question from '../components/Question'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
import shuffle from 'shuffle-array'


class QuizContentView extends Component {

  static propTypes = {
    questions: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title
  })

  render(){
    const { questions, order } = this.props

    return (
      <View style={{flex:1}}>
        <Swiper
          showsButtons={true}
          loadMinimal={true}
          showsPagination={false}
          onChangeIndexChanged={this.handleIndexChanged}>
          {order.map((id, index) => {
            const {question, answer} = questions[id]
            return (
              <Question
                key={id}
                questionText={question}
                answerText={answer}
                showAnswer={true}
                numberIs={index}
                numberTotal={Object.keys(questions).length}
                onMarkCorrect={(id)=>{alert(`Mark ${id} Correct`)}}
                onMarkIncorrect={(id)=>{alert(`Mark ${id} Incorrect`)}}
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
    grades: quiz.grades
  }
}

export default connect(mapStateToProps)(QuizContentView)
