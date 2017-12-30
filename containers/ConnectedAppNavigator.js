import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { StackNavigator, addNavigationHelpers} from 'react-navigation'
import { Icon } from 'react-native-elements'
import HomeView from './HomeView'
import QuizFrontView from './QuizFrontView'
import QuizContentView from './QuizContentView'
import QuizEditorView from './QuizEditorView'
import { white, darkBlue, lightBlue } from '../utils/colors'
import PropTypes from 'prop-types'
import { resetNavigation } from '../actions/navigation'

const styles = StyleSheet.create({
  homeContainer: {
    marginRight:10,
    width:30,
    height:30,
    borderRadius:15
  },
  homeIcon:{
    color:white
  }
})

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
  navigationOptions: ({navigation}) => {
    return {
      headerStyle:{backgroundColor:darkBlue},
      gesturesEnabled: false,
      headerTintColor: white,
      headerBackTitle: null,
      headerRight: (
        <Icon
          containerStyle={styles.homeContainer}
          iconStyle={styles.homeIcon}
          underlayColor={lightBlue}
          name='home'
          onPress={()=>navigation.dispatch(
            resetNavigation({index:0, routeName:'Home'})
          )}
        />
      )
    }
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
