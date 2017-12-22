import React from 'react'
import { Text } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { white, darkBlue } from '../utils/colors'
import PropTypes from 'prop-types'

MenuBar.propTypes = {
  title: PropTypes.string.isRequired,
  onPressRight: PropTypes.func.isRequired
}

export default function MenuBar(props){
  return (
    <Header backgroundColor={darkBlue}>
      <Icon
        name='menu'
        color={white}
      />
      <Text style={{color:white}}>
        {props.title}
      </Text>
      <Icon
        name='home'
        color={white}
        onPress={() => props.onPressRight()}
      />
    </Header>
  )
}
