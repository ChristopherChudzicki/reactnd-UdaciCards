import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuizCard from '../components/QuizCard'
import PropTypes from 'prop-types'
import { submitQuestionScore, toggleAnswerVisibility, setAnswerVisibility } from '../actions/quiz'
import { lightBlue, lightOrange, white } from '../utils/colors'

class QuizCardContainer extends Component {
  static propTypes = {
    gradeStatus: PropTypes.bool,
    // showAnswer: PropTypes.bool.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    numTotal: PropTypes.number.isRequired,
    submitQuestionScore: PropTypes.func.isRequired,
    showNextCard: PropTypes.func.isRequired,
    isAnswerVisible: PropTypes.bool.isRequired,
    toggleAnswerVisibility: PropTypes.func.isRequired,
    setAnswerVisibility: PropTypes.func.isRequired
  }

  markCorrect = () => {
    const {id, submitQuestionScore, showNextCard } = this.props;
    submitQuestionScore({id, isCorrect:true})
    showNextCard()
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
      <QuizCard
        questionText={question}
        answerText={answer}
        backgroundColor={this.getBackgroundColor(gradeStatus)}
        numberIs={index}
        numberTotal={numTotal}
        onMarkCorrect={ this.markCorrect }
        onMarkIncorrect={ this.markIncorrect }
        gradeStatus={this.props.gradeStatus}
        isAnswerVisible={isAnswerVisible}
        onToggleAnswerVisibility={this._toggleAnswerVisibility}
      />
    )
  }
}

const mapStateToProps = ({cards, quiz}, ownProps) => {
  const { question, answer } = cards[ownProps.id]
  return {
    question,
    answer,
    gradeStatus: quiz.grades[ownProps.id],
    isAnswerVisible: quiz.answerVisibility[ownProps.id] === undefined
      ? false
      : quiz.answerVisibility[ownProps.id]
  }
}

const mapDispatchToProps = {
  submitQuestionScore,
  toggleAnswerVisibility,
  setAnswerVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCardContainer)
