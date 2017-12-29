import { combineReducers } from 'redux'
import decks from './decks'
import cards from './cards'
import quiz from './quiz'
import modals from './modals'
import confirmer from './confirmer'

export default function getRootReducer(navReducer){
  return combineReducers({
    navigation:navReducer,
    decks,
    cards,
    quiz,
    modals,
    confirmer
  })
}
