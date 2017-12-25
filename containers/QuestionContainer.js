import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from '../components/Question'
import PropTypes from 'prop-types'
import { submitQuestionScore, toggleAnswerVisibility, setAnswerVisibility } from '../actions/quiz'
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
    afterPressYes: PropTypes.func.isRequired,
    isAnswerVisible: PropTypes.bool.isRequired,
    toggleAnswerVisibility: PropTypes.func.isRequired,
    setAnswerVisibility: PropTypes.func.isRequired
  }

  markCorrect = () => {
    const {id, submitQuestionScore, afterPressYes } = this.props;
    submitQuestionScore({id, isCorrect:true})
    afterPressYes()
  }

  markIncorrect = () => {
    const {id, submitQuestionScore, setAnswerVisibility } = this.props
    submitQuestionScore({id, isCorrect:false})
    setAnswerVisibility({id, visibility:true})
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
  toggleAnswerVisibility,
  setAnswerVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)
