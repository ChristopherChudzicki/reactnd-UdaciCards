import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import HomeView from './HomeView'
import QuizView from './QuizView'
import { receiveDecks } from '../actions/decks'
import { fetchDecksAsync, resetDecksToDummyAsync } from '../utils/api'
import PropTypes from 'prop-types'

// End Temp

const MainNavigator = StackNavigator({
  Home: {
    screen: HomeView
  },
  Quiz: {
    screen: QuizView
  }
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    header: null,
    gesturesEnabled: false
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
