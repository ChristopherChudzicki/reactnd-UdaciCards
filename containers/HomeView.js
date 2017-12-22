import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import DeckSummaries from '../components/DeckSummaries'
import MenuBar from '../components/MenuBar'
import PropTypes from 'prop-types'
import { startQuiz } from '../actions/quiz'

class HomeView extends Component {
  static propTypes = {
    deckList: PropTypes.array.isRequired,
    startQuiz: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  startQuiz(id){

    this.props.startQuiz(id)
    this.props.navigation.navigate('Quiz')

    // set activity
  }

  render(){

    return (
      <View style={{flex:1}}>
        <MenuBar title="Home" />
        <DeckSummaries
          deckList={this.props.deckList}
          onPressHandler={(id)=>this.startQuiz(id)}
          onPressSettingsHandler={(id)=>alert(`Settings for Deck ${id}`)}
          editMode={true}
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
  startQuiz
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
