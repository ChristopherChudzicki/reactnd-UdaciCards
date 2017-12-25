import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import HomeView from './HomeView'
import QuizFrontView from './QuizFrontView'
import QuizContentView from './QuizContentView'
import { receiveDecks } from '../actions/decks'
import { fetchDecksAsync, resetDecksToDummyAsync } from '../utils/api'
import PropTypes from 'prop-types'
import { white, darkBlue } from '../utils/colors'

const MainNavigator = StackNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  QuizFront: {
    screen: QuizFrontView
  },
  QuizContent: {
    screen: QuizContentView
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
    receiveDecks: PropTypes.func.isRequired
  }

  componentDidMount(){
    fetchDecksAsync()
      .then( decks => {
        if (decks === null){
          alert("Seeding Local Storage")
          return resetDecksToDummyAsync().then( fetchDecksAsync )
        }
        return decks
      })
      .then( this.props.receiveDecks )
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
  receiveDecks: receiveDecks
}

export default connect(null, mapDispatchToProps)(Main)
