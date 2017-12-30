import React from 'react'
import { FlatList, View } from 'react-native'
import { List } from 'react-native-elements'
import PropTypes from 'prop-types'
import DeckSummary from '../containers/DeckSummary'

DeckSummaries.propTypes = {
  deckList: PropTypes.array.isRequired,
  isInEditMode: PropTypes.bool.isRequired,
  containerStyle: PropTypes.object
}

export default function DeckSummaries(props){

  return (
    <View style={[{flex:1},props.containerStyle]}>
      <List>
        <FlatList
          data={props.deckList}
          keyExtractor={(item) => item.id}
          // Extra Data: https://facebook.github.io/react-native/docs/flatlist.html#extradata
          // https://stackoverflow.com/a/44279879/2747370
          extraData={props.isInEditMode}
          renderItem={({item}) => (
            <DeckSummary
              id={item.id}
              deck={item}
              numTotal={Object.keys(item.defaultOrder).length}
              isInEditMode={props.isInEditMode}
            />
          )}
        />
      </List>
    </View>
  )
}
