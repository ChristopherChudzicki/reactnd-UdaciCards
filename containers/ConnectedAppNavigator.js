import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers} from 'react-navigation'
import HomeView from './HomeView'
import QuizFrontView from './QuizFrontView'
import QuizContentView from './QuizContentView'
import QuizEditorView from './QuizEditorView'
import { white, darkBlue } from '../utils/colors'
import PropTypes from 'prop-types'


// For connecting redux to AppNavigator, I followed
// https://medium.com/modus-create-front-end-development/using-react-navigation-and-redux-in-your-react-native-application-efac33265138

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeView
  },
  QuizFront: {
    screen: QuizFrontView
  },
  QuizContent: {
    screen: QuizContentView
  },
  QuizEditor: {
    screen: QuizEditorView
  }
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle:{backgroundColor:darkBlue},
    gesturesEnabled: false,
    headerTintColor: white,
    headerBackTitle: null,
  }
})

export const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

class ConnectedAppNavigator extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation
})

export default connect(mapStateToProps)(ConnectedAppNavigator)
