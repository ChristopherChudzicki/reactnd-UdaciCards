import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import QuizSummary from '../components/QuizSummary'
import { NavigationActions } from 'react-navigation'
import {
  blue, darkBlue,
  orange, darkOrange,
  gray, darkGray
} from '../utils/colors'



class QuizSummaryContainer extends Component {
  static propTypes = {
    grades: PropTypes.object.isRequired,
    defaultOrder: PropTypes.array.isRequired,
    navigation: PropTypes.object
  }

  _onPressHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
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

export default connect(mapStateToProps)(QuizSummaryContainer)
