import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import QuizFrontPage from '../components/QuizFrontPage'
import { toggleRandomizeQuestionOrder, setQuizOrder } from '../actions/quiz'
import shuffle from 'shuffle-array'

function range(n){
  const val = []
  for (let j=0; j<n;j++){
    val.push(j)
  }
  return val
}

class QuizFrontView extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    numTotal: PropTypes.number.isRequired,
    isRandomOrder: PropTypes.bool.isRequired,
    toggleRandomizeQuestionOrder: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    setQuizOrder: PropTypes.func.isRequired
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title
  })

  onPressStart = () => {
    // const order = [...Array(this.props.numTotal).keys()]
    // const order = Array.from(Array(this.props.numTotal).keys())
    const order = range(this.props.numTotal)
    if (this.props.isRandomOrder){
      shuffle(order)
    }
    this.props.setQuizOrder(order)
    this.props.navigation.navigate('QuizContent', {'title': this.props.title})
  }

  render(){
    const {title, numTotal} = this.props

    return (
      <QuizFrontPage
        title={title}
        numTotal={numTotal}
        isRandomOrder={this.props.isRandomOrder}
        onToggleRandomizeQuizOrder={this.props.toggleRandomizeQuestionOrder}
        onPressStart={this.onPressStart}
        onPressAddCard={()=>{alert('Pressed AddCard')}}
      />
    )
  }
}

const mapStateToProps = ({decks, quiz}) => {

  const { title, questions } = decks[quiz.activeDeckId]
  return {
    title: title,
    numTotal: Object.keys(questions).length,
    isRandomOrder: quiz.isRandomOrder
  }
}

const mapDispatchToProps = {
  toggleRandomizeQuestionOrder,
  setQuizOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizFrontView)
