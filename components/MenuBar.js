import React from 'react'
import { Header } from 'react-native-elements'
import { white, darkBlue } from '../utils/colors'
import PropTypes from 'prop-types'

MenuBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default function MenuBar(props){
  return (
    <Header
      leftComponent={{ icon: 'menu', color: white }}
      centerComponent={{ text: props.title, style: { color: white } }}
      rightComponent={{ icon: 'home', color: white }}
      backgroundColor={darkBlue}
    />
  )
}
