import { combineReducers } from 'redux'
import decks from './decks'
import cards from './cards'
import quiz from './quiz'
import modals from './modals'
import confirmer from './confirmer'

export default combineReducers({
  decks,
  cards,
  quiz,
  modals,
  confirmer
})
