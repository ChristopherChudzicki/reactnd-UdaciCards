import React from 'react'
import { Constants } from 'expo'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { lightBlue } from '../utils/colors'

const StatusBarView = styled.View`
  height:${Constants.statusBarHeight};
  background-color:${lightBlue};
`

export default function UdaciStatusBar(props) {
  return (
    <StatusBarView>
      <StatusBar translucent {...props}/>
    </StatusBarView>
  )
}
