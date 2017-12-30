import React, { Component } from 'react'
import { Provider } from 'react-redux'
import getStore from './store'
import ConnectedAppNavigator, { navReducer } from './containers/ConnectedAppNavigator'
import { receiveDecks } from './actions/decks'
import { receiveCards } from './actions/cards'
import {
  fetchDecksAsync,
  resetStorage,
  fetchCardsAsync
} from './utils/api'

const store = getStore(navReducer)

export default class App extends Component {

  componentDidMount(){

    fetchDecksAsync()
      .then(decks => {
        fetchCardsAsync()
          .then(cards => {
            if (decks === null || cards === null ){
              alert('Seeding Local Storage')
              return resetStorage() // returns {decks, cards}
            }
            return {decks, cards}
          })
          .then(({cards, decks}) => {
            store.dispatch( receiveDecks(decks) )
            store.dispatch( receiveCards(cards) )
          } )
      })
  }

  render() {
    return (
        <Provider store={store}>
          <ConnectedAppNavigator/>
        </Provider>
    );
  }
}
