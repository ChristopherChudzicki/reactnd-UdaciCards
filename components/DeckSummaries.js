import React from 'react'
import { FlatList } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { lightBlue } from '../utils/colors'
import PropTypes from 'prop-types'

export default function DeckSummaries(props){
  return (
    <List style={{flex:1}}>
      <FlatList
        data={props.decks}
        keyExtractor={(item, idx) => item.id}
        renderItem={({item}) => (
          <ListItem
            title={item.title}
            subtitle={`${item.numQuestions} Questions`}
            onPress={()=>alert("Pressed")}
            underlayColor={lightBlue}
          />
        )}
      />
    </List>
  )
}
