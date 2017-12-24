import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from '../components/Question'
import PropTypes from 'prop-types'
import { submitQuestionScore } from '../actions/quiz'
import { lightBlue, lightOrange, white } from '../utils/colors'

class QuestionContainer extends Component {
  static propTypes = {
    gradeStatus: PropTypes.bool,
    // showAnswer: PropTypes.bool.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    numTotal: PropTypes.number.isRequired,
    submitQuestionScore: PropTypes.func.isRequired,
    afterPressGrade: PropTypes.func.isRequired
  }

  markCorrect = (id) => {
    this.props.submitQuestionScore({id, isCorrect:true})
    this.props.afterPressGrade()
  }

  markIncorrect = (id) => {
    this.props.submitQuestionScore({id, isCorrect:false})
    this.props.afterPressGrade()
  }

  getBackgroundColor(gradeStatus){
    if (gradeStatus==='undefined'){
      return white
    }
    if (gradeStatus===true){
      return lightBlue
    }
    if (gradeStatus===false){
      return lightOrange
    }
  }

  render(){
    const { question, answer, gradeStatus, index, id, numTotal } = this.props
    return (
      <Question
        questionText={question}
        answerText={answer}
        backgroundColor={this.getBackgroundColor(gradeStatus)}
        numberIs={index}
        numberTotal={numTotal}
        onMarkQuestionCorrect={()=>this.markCorrect(id)}
        onMarkQuestionIncorrect={()=>this.markIncorrect(id)}
        gradeStatus={this.props.gradeStatus}
      />
    )
  }
}

const mapStateToProps = ({decks, quiz}, ownProps) => {
  const { questions } = decks[quiz.activeDeckId]
  const { question, answer } = questions[ownProps.id]
  return {
    question,
    answer,
    gradeStatus: quiz.grades[ownProps.id]
  }
}

const mapDispatchToProps = {
  submitQuestionScore: submitQuestionScore
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)
