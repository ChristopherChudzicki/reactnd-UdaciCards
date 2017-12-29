import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import HomeView from './HomeView'
import QuizFrontView from './QuizFrontView'
import QuizContentView from './QuizContentView'
import QuizEditorView from './QuizEditorView'
import { receiveDecks } from '../actions/decks'
import { receiveCards } from '../actions/cards'
import {
  fetchDecksAsync,
  resetStorageToDummy,
  fetchCardsAsync
  } from '../utils/api'
import PropTypes from 'prop-types'
import { white, darkBlue } from '../utils/colors'

const MainNavigator = StackNavigator({
  Home: {
    screen: HomeView
  },
  QuizFront: {
    screen: QuizFrontView
  },
  QuizContent: {
    screen: QuizContentView
  },
  QuizEditor: {
    screen: QuizEditorView
  }
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle:{backgroundColor:darkBlue},
    gesturesEnabled: false,
    headerTintColor: white,
    headerBackTitle: null,
  }
})

class Main extends Component {
  static propTypes = {
    receiveDecks: PropTypes.func.isRequired,
    receiveCards: PropTypes.func.isRequired
  }

  componentDidMount(){
    fetchDecksAsync()
      .then(decks => {
        fetchCardsAsync()
          .then(cards => {
            if (decks === null || cards === null ){
              alert('Seeding Local Storage')
              return resetStorageToDummy() // returns {decks, cards}
            }
            return {decks, cards}
          })
          .then(({cards, decks}) => {
            this.props.receiveDecks(decks)
            this.props.receiveCards(cards)
          } )
      })
  }

  render(){
    return (
      <View style={{flex:1}}>
        <MainNavigator/>
      </View>
    )
  }
}

const mapDispatchToProps = {
  receiveDecks,
  receiveCards
}

export default connect(null, mapDispatchToProps)(Main)
