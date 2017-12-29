import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import DeckSummaries from '../components/DeckSummaries'
import PropTypes from 'prop-types'
import { setNewDeckVisibility } from '../actions/modals'
import { setActiveDeck } from '../actions/quiz'
import { addDeck } from '../actions/decks'
import { clearDecksAsync } from '../utils/api'
import AddDeckButton from '../components/AddDeckButton'
import NewDeckForm  from '../components/NewDeckForm'
import Modal from '../components/Modal';

class HomeView extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    isNewDeckVisible: PropTypes.bool.isRequired,
    deckList: PropTypes.array.isRequired,
    setActiveDeck: PropTypes.func.isRequired,
    addDeck: PropTypes.func.isRequired,
    setNewDeckVisibility: PropTypes.func.isRequired
  }

  static navigationOptions = {
    title: 'Home'
  }

  showModal = () => this.props.setNewDeckVisibility(true)

  hideModal = () => this.props.setNewDeckVisibility(false)

  onPressDeckHandler = ({id, title}) => {
    this.props.setActiveDeck(id)
    this.props.navigation.navigate('QuizFront', {
      'title': title
    })

    // set activity
  }

  render(){

    return (
      <View style={styles.container}>
        <DeckSummaries
          isInEditMode={true}
          deckList={this.props.deckList}
          onPressDeck={this.onPressDeckHandler}
          onPressSettings={(id)=>alert(`Settings for Deck ${id}`)}
          editMode={true}
        />
        <Button
          title={'Clear App DB'}
          raised
          Component={TouchableOpacity}
          onPress={clearDecksAsync}
        />
        <Modal
          open={this.props.isNewDeckVisible}
          modalDidClose={this.hideModal}>
          <NewDeckForm
            onPressSubmit={this.props.addDeck}
            onPressCancel={this.hideModal}
          />
        </Modal>
        <AddDeckButton onPress={this.showModal} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-between'
  }
})

function deckListSorter(deckA, deckB){
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  if (deckA.title < deckB.title){
    return -1
  }
  if (deckA.title > deckB.title){
    return 1
  }
  else {
    return 0
  }
}

const mapStateToProps = ({decks, modals}) => ({
  isNewDeckVisible: modals.isNewDeckVisible,
  deckList: Object.keys(decks).map(
    id => ({...decks[id], id})
  ).sort(deckListSorter)
})

const mapDispatchToProps = {
  setActiveDeck,
  addDeck,
  setNewDeckVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
