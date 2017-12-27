import React from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import SortableListView from 'react-native-sortable-listview'
import PropTypes from 'prop-types'
import { white } from '../utils/colors'

CardListEditor.propTypes = {
  data: PropTypes.object.isRequired,
  order: PropTypes.array.isRequired
}

function CardSummary(props){
  return (
    <ListItem
      title={props.data.question}
      {...props.sortHandlers}
    />
  )
}

function renderRow(row){
  return <CardSummary data={row}/>
}

export default function CardListEditor(props){
  return (
    <View style={{flex:1, backgroundColor:white, margin:15}}>
      <SortableListView
        data={props.data}
        order={props.order}
        renderRow={renderRow}
      />
    </View>
  )
}
