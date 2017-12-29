import React from 'react'
import { FlatList } from 'react-native'
import { List } from 'react-native-elements'
import PropTypes from 'prop-types'
import DeckSummary from '../containers/DeckSummary'

DeckSummaries.propTypes = {
  deckList: PropTypes.array.isRequired,
  isInEditMode: PropTypes.bool.isRequired,
  onPressDeck: PropTypes.func.isRequired,
  onPressSettings: PropTypes.func.isRequired
}

export default function DeckSummaries(props){

  return (
    <List style={{flex:1}}>
      <FlatList
        data={props.deckList}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <DeckSummary
            id={item.id}
            title={item.title}
            onPressDeck={props.onPressDeck}
            numTotal={Object.keys(item.defaultOrder).length}
            isInEditMode={props.isInEditMode}
          />
        )}
      />
    </List>
  )
}
