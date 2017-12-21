import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'
import { lightBlue } from '../utils/colors'

export default class DeckSummary extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    numQuestions: PropTypes.number.isRequired
  }

  render(){
    const {title, numQuestions} = this.props
    return (
      <ListItem
        title={title}
        subtitle={`${numQuestions} Questions`}
        onPress={()=>alert("Pressed")}
        underlayColor={lightBlue}
      />
    )
  }
}
