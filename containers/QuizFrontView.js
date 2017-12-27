import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import NewCardForm from '../components/NewCardForm'
import PropTypes from 'prop-types'
import QuizFrontPage from '../components/QuizFrontPage'
import { toggleRandomizeQuestionOrder, setQuizOrder } from '../actions/quiz'
import { addCard } from '../actions/decks'
import shuffle from 'shuffle-array'
import CardListEditor from '../components/CardListEditor'

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
    setQuizOrder: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    activeDeckId: PropTypes.string.isRequired
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title
  })

  state = {
    isAddModalVisible: false,
    isEditModalVisible: false,
  }

  showAddModal = () => this.setState({ isAddModalVisible: true })

  hideAddModal = () => this.setState({ isAddModalVisible: false })

  showEditModal = () => this.setState({ isEditModalVisible: true })

  hideEditModal = () => this.setState({ isEditModalVisible: false })

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
    const {title, numTotal, cardsData, defaultOrder} = this.props

    return (
      <View style={{flex:1}}>
        <QuizFrontPage
          title={title}
          numTotal={numTotal}
          isRandomOrder={this.props.isRandomOrder}
          onToggleRandomizeQuizOrder={this.props.toggleRandomizeQuestionOrder}
          onPressStart={this.onPressStart}
          onPressAddCard={this.showAddModal}
          onPressEditQuiz={this.showEditModal}
        />
        <Modal style={{flex:1}} isVisible={this.state.isAddModalVisible}>
          <NewCardForm
            deckId={this.props.activeDeckId}
            onPressSubmit={this.props.addCard}
            onPressCancel={this.hideAddModal}
          />
        </Modal>
        <Modal style={{flex:1}} isVisible={this.state.isEditModalVisible}>
          <CardListEditor
            data={cardsData}
            order={defaultOrder}
          />
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = ({decks, quiz, cards}) => {
  const { activeDeckId } = quiz
  const {defaultOrder, title} = decks[activeDeckId]
  const cardsData = defaultOrder.reduce( (acc, cardId) => {
    acc[cardId] = cards[cardId]
    return acc
  }, {})
  return {
    defaultOrder: defaultOrder,
    cardsData: cardsData,
    activeDeckId: activeDeckId,
    title: title,
    numTotal: defaultOrder.length,
    isRandomOrder: quiz.isRandomOrder
  }
}

const mapDispatchToProps = {
  toggleRandomizeQuestionOrder,
  setQuizOrder,
  addCard
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizFrontView)
