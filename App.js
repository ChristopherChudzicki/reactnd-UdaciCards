import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Main from './containers/Main'
import { View, Text, StyleSheet } from 'react-native'

export default class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <Main/>
        </Provider>
    );
  }
}
