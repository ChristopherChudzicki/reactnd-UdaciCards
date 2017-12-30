import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { lightBlue, gray } from '../utils/colors'
import { setActiveDeck } from '../actions/quiz'
import { navigate } from '../actions/navigation'
import { setEditDeckVisibility } from '../actions/modals'
import { setConfirmState } from '../actions/confirmer'

class DeckSummary extends Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    isInEditMode: PropTypes.bool.isRequired,
    setActiveDeck: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setEditDeckVisibility: PropTypes.func.isRequired,
    setConfirmState: PropTypes.func.isRequired
  }

  onPressEdit = () => {
    this.props.setActiveDeck(this.props.deck.id)
    this.props.setEditDeckVisibility(true)
  }

  onPressDelete = () => {
    const {deck, id} = this.props
    this.props.setConfirmState({
      isVisible: true,
      title: 'Delete?',
      message: `Are you sure you want to delete the deck "${deck.title}"?`,
      data: {
        deckId: id,
        cardIdList: deck.defaultOrder
      }
    })
  }

  onPress = () => {
    this.props.setActiveDeck(this.props.id)
    this.props.navigate('QuizFront', {title: this.props.deck.title})
  }

  render(){

    const {deck, isInEditMode} = this.props

    return (
      <ListItem
        title={deck.title}
        subtitle={`${deck.defaultOrder.length} Questions`}
        onPress={this.onPress}
        underlayColor={lightBlue}
        leftIcon={isInEditMode ?
          <Icon
            name='pencil'
            size={18}
            type='font-awesome'
            iconStyle={[styles.icon, styles.shadow]}
            onPress={this.onPressEdit}
          /> : {}
        }
        rightIcon={isInEditMode ?
          <Icon
            name='delete'
            iconStyle={[styles.icon, styles.shadow]}
            onPress={this.onPressDelete}
          /> : {}
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  leftIconsContainer: {
    flexDirection:'row'
  },
  icon: {
    color: gray,
    paddingRight:10
  },
  shadow: {
    shadowRadius: 1.5,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 1,
      height: 2
    }
  }
})

const mapDispatchToProps = {
  setActiveDeck,
  navigate,
  setEditDeckVisibility,
  setConfirmState
}

export default connect(null, mapDispatchToProps)(DeckSummary)
