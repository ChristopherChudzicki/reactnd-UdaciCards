import React, { Component } from 'react'
import { View } from 'react-native'
import DeckSummaries from '../components/DeckSummaries'
import MenuBar from '../components/MenuBar'

class HomeView extends Component {
  state = {
    decks: [
      {id: 'id0', title: "Title 0", numQuestions:6},
      {id: 'id1', title: "Title 1", numQuestions:4},
      {id: 'id2', title: "Title 2", numQuestions:7},
      {id: 'id3', title: "Title 3", numQuestions:8}
    ]
  }

  render(){
    return (
      <View style={{flex:1}}>
        <MenuBar title="Home" />
        <DeckSummaries
          decks={this.state.decks}
          onPressHandler={(id)=>alert(`Pressed Deck ${id}`)}
          onPressSettingsHandler={(id)=>alert(`Settings for Deck ${id}`)}
          editMode={true}
        />
      </View>
    )
  }
}

export default HomeView
