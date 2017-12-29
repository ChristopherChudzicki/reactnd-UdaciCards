import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import QuizSummary from '../components/QuizSummary'
import { resetNavigation } from '../actions/navigation'
import {
  blue, darkBlue,
  orange, darkOrange,
  gray, darkGray
} from '../utils/colors'



class QuizSummaryContainer extends Component {
  static propTypes = {
    grades: PropTypes.object.isRequired,
    defaultOrder: PropTypes.array.isRequired,
    resetNavigation: PropTypes.func.isRequired
  }

  _onPressHome = () => {
    this.props.resetNavigation({index:0, routeName: 'Home'})
  }

  render(){
    const { defaultOrder, grades } = this.props

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
        detailsArray={detailsArray}
        score={score}
        numTotal={numTotal}
        onPressHome={this._onPressHome}
      />
    )
  }
}

const mapStateToProps = ({ quiz, decks }) => ({
  grades: quiz.grades,
  defaultOrder: decks[quiz.activeDeckId].defaultOrder
})

const mapDispatchToProps = {
  resetNavigation
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryContainer)
