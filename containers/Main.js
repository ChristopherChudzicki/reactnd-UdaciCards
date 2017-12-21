import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { View } from 'react-native'
import HomeView from './HomeView'
import QuizView from './QuizView'
import { receiveDecks } from '../actions/decks'
import { fetchDecksAsync } from '../utils/api'
import PropTypes from 'prop-types'

class Main extends Component {
  static propTypes = {
    receiveDecks: PropTypes.func.isRequired
  }

  componentDidMount(){
    fetchDecksAsync()
      .then( decks => this.props.receiveDecks(decks) )
  }

  render(){
    return (
      <View style={{flex:1}}>
        <HomeView />
        <QuizView />
      </View>
    )
  }
}

const mapDispatchToProps = {
  receiveDecks: receiveDecks
}

export default connect(null, mapDispatchToProps)(Main)
