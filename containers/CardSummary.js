import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { gray, lightBlue } from '../utils/colors'
import { setActiveCard } from '../actions/quiz'
import { setEditCardVisibility } from '../actions/modals'
import { setConfirmState } from '../actions/confirmer'

class CardSummary extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    sortHandlers: PropTypes.object,
    cardId: PropTypes.string.isRequired,
    activeDeckId: PropTypes.string.isRequired,
    setActiveCard: PropTypes.func.isRequired,
    setEditCardVisibility: PropTypes.func.isRequired,
    setConfirmState: PropTypes.func.isRequired
  }

  onPressEdit = () => {
    this.props.setActiveCard(this.props.cardId)
    this.props.setEditCardVisibility(true)
  }

  onPressDelete = () => {
    this.props.setConfirmState({
      id: 'deleteCard',
      title: 'Delete?',
      message: `Are you sure you want to delete the card "${this.props.data.question}"`,
      isVisible: true,
      data: {cardId: this.props.cardId, deckId: this.props.activeDeckId}
    })
  }

  render(){
    return (
      <ListItem
        title={this.props.data.question}
        underlayColor={lightBlue}
        leftIcon={
          <View style={styles.leftIconsContainer}>
            <Icon
              type='material-community'
              name='drag-vertical'
            />
            <Icon
              name='pencil'
              size={18}
              type='font-awesome'
              iconStyle={[styles.icon, styles.shadow]}
              onPress={this.onPressEdit}
            />
          </View>
        }
        rightIcon={
          <Icon
            name='delete'
            iconStyle={[styles.icon, styles.shadow]}
            onPress={this.onPressDelete}
          />
        }
        {...this.props.sortHandlers}
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

const mapStateToProps = ({quiz}) => ({
  activeDeckId: quiz.activeDeckId
})

const mapDispatchToProps = {
  setActiveCard,
  setEditCardVisibility,
  setConfirmState
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSummary)
