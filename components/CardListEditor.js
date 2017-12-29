import React from 'react'
import { View } from 'react-native'
import CardSummary from '../containers/CardSummaryEditable'
import SortableListView from 'react-native-sortable-listview'
import PropTypes from 'prop-types'
import { white } from '../utils/colors'

CardListEditor.propTypes = {
  data: PropTypes.object.isRequired,
  order: PropTypes.array.isRequired,
  onRowMoved: PropTypes.func.isRequired,
}

function renderRow(rowData, sectionId, rowId){
  return <CardSummary data={rowData} id={rowId}/>
}

export default function CardListEditor(props){
  return (
    <View style={{flex:1, backgroundColor:white, margin:15}}>
      <SortableListView
        data={props.data}
        order={props.order}
        renderRow={renderRow}
        onRowMoved={props.onRowMoved}
      />
    </View>
  )
}
