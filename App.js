import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import getStore from './store'

import { StackNavigator, addNavigationHelpers} from 'react-navigation'
import HomeView from './containers/HomeView'
import QuizFrontView from './containers/QuizFrontView'
import QuizContentView from './containers/QuizContentView'
import QuizEditorView from './containers/QuizEditorView'
import { receiveDecks } from './actions/decks'
import { receiveCards } from './actions/cards'
import {
  fetchDecksAsync,
  resetStorageToDummy,
  fetchCardsAsync
  } from './utils/api'
import { white, darkBlue } from './utils/colors'
import PropTypes from 'prop-types'

// For connecting redux to AppNavigator, I followed
// https://medium.com/modus-create-front-end-development/using-react-navigation-and-redux-in-your-react-native-application-efac33265138

const AppNavigator = StackNavigator({
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

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const store = getStore(navReducer)

class AppWithNavStore extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation
})

const ConnectedAppWithNavStore = connect(mapStateToProps)(AppWithNavStore)

export default class App extends Component {

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
            store.dispatch( receiveDecks(decks) )
            store.dispatch( receiveCards(cards) )
          } )
      })
  }

  render() {
    return (
        <Provider store={store}>
          <ConnectedAppWithNavStore/>
        </Provider>
    );
  }
}
