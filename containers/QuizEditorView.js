import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { editDeckOrder } from '../actions/decks'
import CardListEditor from '../components/CardListEditor'
import PropTypes from 'prop-types'
import EditCardContainer from '../containers/EditCardContainer'

class QuizEditorView extends Component {

  static propTypes = {
    cardsData: PropTypes.object.isRequired,
    defaultOrder: PropTypes.array.isRequired,
    activeDeckId: PropTypes.string.isRequired,
  }

  static navigationOptions = ({navigation}) => ({
    title: `Editing ${navigation.state.params.quizTitle}`
  })

  onRowMoved = ({from, to}) => {
    const oldOrder = this.props.defaultOrder
    const newOrder = oldOrder.splice(to, 0, oldOrder.splice(from, 1)[0])
    editDeckOrder({
      deckId: this.props.activeDeckId,
      defaultOrder: newOrder
    })
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
  editDeckOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizEditorView)
