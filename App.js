import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { fetchDecksAsync } from './utils/api'
import { View } from 'react-native'
import HomeView from './containers/HomeView'
import QuizView from './containers/QuizView'

export default class App extends Component {
  componentDidMount(){
    fetchDecksAsync()
  }

  render() {
    return (
        <Provider store={store}>
          <View style={{flex:1}}>
            {/* <QuizView /> */}
            <HomeView />
          </View>
        </Provider>
    );
  }
}
