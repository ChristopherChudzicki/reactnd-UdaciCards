import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import DeckSummaries from '../components/DeckSummaries'
import PropTypes from 'prop-types'
import { activateQuiz } from '../actions/quiz'
import { clearDecksAsync } from '../utils/api'
import AddDeckButton from '../components/AddDeckButton'
import NewDeckForm  from '../components/NewDeckForm'
import Modal from 'react-native-modal'


class HomeView extends Component {

  state = {
    isModalVisible: false
  }

  static propTypes = {
    deckList: PropTypes.array.isRequired,
    activateQuiz: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = {
    title: 'Home'
  }

  showModal = () => this.setState({ isModalVisible: true })

  hideModal = () => this.setState({ isModalVisible: false })

  onPressDeckHandler = (deck) => {
    this.props.activateQuiz(deck.id)
    this.props.navigation.navigate('QuizFront', {
      'title': deck.title
    })

    // set activity
  }

  render(){

    return (
      <View style={styles.container}>
        <DeckSummaries
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
        <Modal style={{flex:1}} isVisible={this.state.isModalVisible}>
          <NewDeckForm
            onPressSubmit={()=>alert("Submit")}
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

const mapStateToProps = state => ({
  deckList: Object.keys(state.decks).map(
    id => ({...state.decks[id], id})
  )
})

const mapDispatchToProps = {
  activateQuiz
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
