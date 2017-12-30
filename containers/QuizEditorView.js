import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { deleteCard } from '../actions/cards'
import { editDeckDefaultOrder } from '../actions/decks'
import CardListEditor from '../components/CardListEditor'
import PropTypes from 'prop-types'
import EditCardContainer from '../containers/EditCardContainer'
import ConfirmationContainer from '../containers/ConfirmationContainer'

class QuizEditorView extends Component {

  static propTypes = {
    cardsData: PropTypes.object.isRequired,
    defaultOrder: PropTypes.array.isRequired,
    activeDeckId: PropTypes.string.isRequired,
    editDeckDefaultOrder: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired
  }

  static navigationOptions = ({navigation}) => ({
    title: `Editing ${navigation.state.params.quizTitle}`
  })

  onRowMoved = ({from, to}) => {
    const newOrder = [...this.props.defaultOrder] // copy old order
    newOrder.splice(to, 0, newOrder.splice(from, 1)[0]) // mutate the copy
    this.props.editDeckDefaultOrder({
      deckId: this.props.activeDeckId,
      defaultOrder: newOrder
    })
  }

  onConfirm = (data) => {
    const {cardId, deckId} = data
    this.props.deleteCard({cardId, deckId})
  }

  render(){
    const {cardsData, defaultOrder} = this.props

    return (
      <View style={{flex:1}}>
        <CardListEditor
          data={cardsData}
          order={defaultOrder}
          onRowMoved={this.onRowMoved}
        />
        <EditCardContainer/>
        <ConfirmationContainer
          id='deleteCard'
          onConfirm={this.onConfirm}
        />
      </View>
    )
  }
}

const mapStateToProps = ({decks, quiz, cards}) => {
  const {defaultOrder, title} = decks[quiz.activeDeckId]
  const cardsData = defaultOrder.reduce( (acc, cardId) => {
    acc[cardId] = cards[cardId]
    return acc
  }, {})

  return {
    activeDeckId: quiz.activeDeckId,
    defaultOrder: defaultOrder,
    cardsData: cardsData,
    title: title,
    numTotal: defaultOrder.length,
  }
}

const mapDispatchToProps = {
  editDeckDefaultOrder,
  deleteCard
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizEditorView)
