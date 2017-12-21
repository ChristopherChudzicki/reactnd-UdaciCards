import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { lightBlue } from '../utils/colors'
import PropTypes from 'prop-types'

DeckSummaries.propTypes = {
  deckList: PropTypes.array.isRequired,
  editMode: PropTypes.bool.isRequired,
  onPressHandler: PropTypes.func.isRequired,
  onPressSettingsHandler: PropTypes.func.isRequired
}

export default function DeckSummaries(props){

  return (
    <List style={{flex:1}}>
      <FlatList
        data={props.deckList}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <ListItem
            title={item.title}
            subtitle={`${Object.keys(item.questions).length} Questions`}
            onPress={()=>props.onPressHandler(item.id)}
            underlayColor={lightBlue}
            leftIcon={props.editMode && {name:'settings', style:styles.shadow}}
            leftIconOnPress={()=>props.onPressSettingsHandler(item.id)}
          />
        )}
      />
    </List>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowRadius: 1.5,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 1,
      height: 2
    }
  }
})
