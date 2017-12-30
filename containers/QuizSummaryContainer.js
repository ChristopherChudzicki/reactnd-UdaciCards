import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import QuizSummary from '../components/QuizSummary'
import { navigateBack, navigate } from '../actions/navigation'
import {
  clearGrades,
  clearAnswers,
  setQuizOrder,
  updateStudyNotification
} from '../actions/quiz'
import {
  blue, darkBlue,
  orange, darkOrange,
  gray, darkGray
} from '../utils/colors'
import { range } from '../utils/misc'
import shuffle from 'shuffle-array'


class QuizSummaryContainer extends Component {
  static propTypes = {
    grades: PropTypes.object.isRequired,
    defaultOrder: PropTypes.array.isRequired,
    navigateBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    isRandomOrder: PropTypes.bool.isRequired,
    setQuizOrder: PropTypes.func.isRequired,
    updateStudyNotification: PropTypes.func.isRequired,
    clearGrades: PropTypes.func.isRequired,
    clearAnswers: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }

  onPressRetake = () => {
    if (this.props.isRandomOrder){
      const newOrder = shuffle(range(this.props.defaultOrder.length))
      this.props.setQuizOrder(newOrder)
    }
    this.props.updateStudyNotification()
    this.props.clearGrades()
    this.props.clearAnswers()
    // Navigate back to quiz front page before restarting quiz
    // this way if user presses back button during quiz, they'll go back
    // to deck title page instead of the old quiz summary
    // (which will not have the correct data anymore)
    this.props.navigateBack()
    this.props.navigate('QuizContent', {'title': this.props.title})
  }

  onPressReturn = () => {
    this.props.navigateBack()
  }

  render(){
    const { defaultOrder, grades, title } = this.props

    const details={unanswered:0, incorrect:0, correct:0}
    for (let id of defaultOrder){
      if (grades[id]===undefined){
        details.unanswered += 1
      }
      else if (grades[id]===true){
        details.correct += 1
      }
      else if (grades[id]===false){
        details.incorrect += 1
      }
    }

    const detailsArray = [
      {
        name: 'Correct',
        value: details.correct,
        color: blue,
        textColor: darkBlue
      },
      {
        name: 'Incorrect',
        value: details.incorrect,
        color: orange,
        textColor: darkOrange
      },
      {
        name: 'Unanswered',
        value: details.unanswered,
        color: gray,
        textColor: darkGray
      },
    ]
    const numTotal = defaultOrder.length
    const score = Math.round(100*details.correct/numTotal, 2)

    return (
      <QuizSummary
        title={title}
        detailsArray={detailsArray}
        score={score}
        numTotal={numTotal}
        onPressReturn={this.onPressReturn}
        onPressRetake={this.onPressRetake}
      />
    )
  }
}

const mapStateToProps = ({ quiz, decks }) => {
  const {defaultOrder, title} = decks[quiz.activeDeckId]

  return {
    grades: quiz.grades,
    defaultOrder: defaultOrder,
    title: title,
    isRandomOrder: quiz.isRandomOrder
  }
}

const mapDispatchToProps = {
  navigateBack,
  navigate,
  clearGrades,
  clearAnswers,
  setQuizOrder,
  updateStudyNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryContainer)
