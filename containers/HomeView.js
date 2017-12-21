import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import DeckSummaries from '../components/DeckSummaries'
import MenuBar from '../components/MenuBar'
import PropTypes from 'prop-types'

class HomeView extends Component {
  static propTypes = {
    deckList: PropTypes.array.isRequired
  }

  render(){
    return (
      <View style={{flex:1}}>
        <MenuBar title="Home" />
        <DeckSummaries
          deckList={this.props.deckList}
          onPressHandler={(id)=>alert(`Pressed Deck ${id}`)}
          onPressSettingsHandler={(id)=>alert(`Settings for Deck ${id}`)}
          editMode={true}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  deckList: Object.keys(state.decks.data).map(
    id => ({...state.decks.data[id], id})
  )
})

export default connect(mapStateToProps, null)(HomeView)
