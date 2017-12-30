import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Modal from '../components/Modal'
import EditCardForm from '../components/EditCardForm'
import PropTypes from 'prop-types'
import QuizFrontPage from '../components/QuizFrontPage'
import {
  toggleRandomizeQuestionOrder,
  setQuizOrder,
  updateStudyNotification
} from '../actions/quiz'
import { addCard } from '../actions/cards'
import { setNewCardVisibility } from '../actions/modals'
import shuffle from 'shuffle-array'
import { navigate } from '../actions/navigation'

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
    navigate: PropTypes.func.isRequired,
    setQuizOrder: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    activeDeckId: PropTypes.string.isRequired,
    isNewCardVisible: PropTypes.bool.isRequired,
    setNewCardVisibility: PropTypes.func.isRequired,
    updateStudyNotification: PropTypes.func.isRequired
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title
  })

  showModal = () => this.props.setNewCardVisibility(true)

  hideModal = () => this.props.setNewCardVisibility(false)

  onPressStart = () => {
    const order = range(this.props.numTotal)
    if (this.props.isRandomOrder){
      shuffle(order)
    }
    this.props.setQuizOrder(order)
    this.props.updateStudyNotification()
    this.props.navigate('QuizContent', {'title': this.props.title})
  }

  onPressEditQuiz = () => {
    this.props.navigate('QuizEditor', {'quizTitle': this.props.title})
  }

  render(){
    const {title, numTotal} = this.props

    return (
      <View style={{flex:1}}>
        <QuizFrontPage
          title={title}
          numTotal={numTotal}
          isRandomOrder={this.props.isRandomOrder}
          onToggleRandomizeQuizOrder={this.props.toggleRandomizeQuestionOrder}
          onPressStart={this.onPressStart}
          onPressAddCard={this.showModal}
          onPressEditQuiz={this.onPressEditQuiz}
        />
        <Modal
          visible={this.props.isNewCardVisible}
          modalDidClose={this.hideModal}>
          <EditCardForm
            deckId={this.props.activeDeckId}
            onPressSubmit={this.props.addCard}
            onPressCancel={this.hideModal}
            initialQuestion=''
            initialAnswer=''
            title='New Card'
            submitLabel='Create'
          />
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = ({decks, quiz, modals}) => {
  const { activeDeckId } = quiz
  const {defaultOrder, title} = decks[activeDeckId]
  return {
    activeDeckId: activeDeckId,
    title: title,
    numTotal: defaultOrder.length,
    isRandomOrder: quiz.isRandomOrder,
    isNewCardVisible: modals.isNewCardVisible
  }
}

const mapDispatchToProps = {
  toggleRandomizeQuestionOrder,
  setQuizOrder,
  addCard,
  setNewCardVisibility,
  navigate,
  updateStudyNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizFrontView)
