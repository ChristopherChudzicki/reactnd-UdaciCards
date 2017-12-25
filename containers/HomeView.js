import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import DeckSummaries from '../components/DeckSummaries'
import PropTypes from 'prop-types'
import { activateQuiz } from '../actions/quiz'
import { clearDecksAsync } from '../utils/api'

class HomeView extends Component {
  static propTypes = {
    deckList: PropTypes.array.isRequired,
    activateQuiz: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  onPressHandler = (deck) => {
    this.props.activateQuiz(deck.id)
    this.props.navigation.navigate('QuizFront', {
      'title': deck.title
    })

    // set activity
  }

  render(){

    return (
      <View style={{flex:1}}>
        <DeckSummaries
          deckList={this.props.deckList}
          onPressHandler={this.onPressHandler}
          onPressSettingsHandler={(id)=>alert(`Settings for Deck ${id}`)}
          editMode={true}
        />
        <Button
          title={'Clear App DB'}
          raised
          Component={TouchableOpacity}
          onPress={clearDecksAsync}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  deckList: Object.keys(state.decks).map(
    id => ({...state.decks[id], id})
  )
})

const mapDispatchToProps = {
  activateQuiz
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
