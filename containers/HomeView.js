import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import DeckSummaries from '../components/DeckSummaries'
import PropTypes from 'prop-types'
import { setNewDeckVisibility } from '../actions/modals'
import { setActiveDeck } from '../actions/quiz'
import { addDeck, deleteDeck } from '../actions/decks'
import { resetStorage } from '../utils/api'
import { deckListSorter } from '../utils/misc'
import ControlButtons from '../components/ControlButtons'
import EditDeckForm  from '../components/EditDeckForm'
import Modal from '../components/Modal';
import EditDeckContainer from './EditDeckContainer'
import ConfirmationContainer from './ConfirmationContainer'

class HomeView extends Component {

  static propTypes = {
    isNewDeckVisible: PropTypes.bool.isRequired,
    deckList: PropTypes.array.isRequired,
    setActiveDeck: PropTypes.func.isRequired,
    addDeck: PropTypes.func.isRequired,
    setNewDeckVisibility: PropTypes.func.isRequired,
    activeDeckId: PropTypes.string,
    deleteDeck: PropTypes.func.isRequired
  }

  static navigationOptions = {
    title: 'Home'
  }

  state = {
    isInEditMode: false
  }

  showNewDeckModal = () => this.props.setNewDeckVisibility(true)

  hideNewDeckModal = () => this.props.setNewDeckVisibility(false)

  onDeleteConfirmed = ({cardIdList, deckId}) => {
    this.props.deleteDeck({deckId, cardIdList})
  }

  toggleEditMode = () => {
    this.setState({isInEditMode: !this.state.isInEditMode})
  }

  render(){

    const {isInEditMode} = this.state

    return (
      <View style={styles.container}>
        <DeckSummaries
          isInEditMode={isInEditMode}
          deckList={this.props.deckList}
        />
        <Button
          title={'Clear App DB'}
          raised
          Component={TouchableOpacity}
          onPress={resetStorage}
          containerViewStyle={styles.clearButton}
        />
        <ControlButtons
          onPressAdd={this.showNewDeckModal}
          onPressEdit={this.toggleEditMode}
        />
        <Modal
          visible={this.props.isNewDeckVisible}
          modalDidClose={this.hideNewDeckModal}>
          <EditDeckForm
            title='New Deck'
            onPressSubmit={this.props.addDeck}
            onPressCancel={this.hideNewDeckModal}
            submitLabel='Create'
          />
        </Modal>
        {this.props.activeDeckId && <EditDeckContainer />}
        <ConfirmationContainer
          onConfirm={this.onDeleteConfirmed}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  clearButton: {
    marginTop:20,
    marginBottom:40,
    width:150,
    alignSelf:'center'
  }
})

const mapStateToProps = ({decks, quiz, modals}) => ({
  isNewDeckVisible: modals.isNewDeckVisible,
  activeDeckId: quiz.activeDeckId,
  deckList: Object.keys(decks).map(
    id => ({...decks[id], id})
  ).sort(deckListSorter)
})

const mapDispatchToProps = {
  setActiveDeck,
  addDeck,
  setNewDeckVisibility,
  deleteDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
