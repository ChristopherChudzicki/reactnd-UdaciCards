import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from '../components/Question'
import PropTypes from 'prop-types'
import { submitQuestionScore, toggleAnswerVisibility } from '../actions/quiz'
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
    afterPressGrade: PropTypes.func.isRequired,
    isAnswerVisible: PropTypes.bool.isRequired,
    toggleAnswerVisibility: PropTypes.func.isRequired
  }

  markCorrect = () => {
    const {id, submitQuestionScore, afterPressGrade } = this.props.id;
    submitQuestionScore({id, isCorrect:true})
    afterPressGrade()
  }

  markIncorrect = () => {
    const {id, submitQuestionScore, afterPressGrade } = this.props.id;
    submitQuestionScore({id, isCorrect:false})
    afterPressGrade()
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

  _toggleAnswerVisibility = () => {
    const { toggleAnswerVisibility, id } = this.props
    toggleAnswerVisibility(id)
  }

  render(){
    const {
      question,
      answer,
      gradeStatus,
      index,
      numTotal,
      isAnswerVisible,
      toggleAnswerVisibility
    } = this.props
    return (
      <Question
        questionText={question}
        answerText={answer}
        backgroundColor={this.getBackgroundColor(gradeStatus)}
        numberIs={index}
        numberTotal={numTotal}
        onMarkQuestionCorrect={ this.markCorrect }
        onMarkQuestionIncorrect={ this.markIncorrect }
        gradeStatus={this.props.gradeStatus}
        isAnswerVisible={isAnswerVisible}
        onToggleAnswerVisibility={this._toggleAnswerVisibility}
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
    gradeStatus: quiz.grades[ownProps.id],
    isAnswerVisible: quiz.answerVisibility[ownProps.id] === undefined ? false : quiz.answerVisibility[ownProps.id]
  }
}

const mapDispatchToProps = {
  submitQuestionScore,
  toggleAnswerVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)
