import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  DELETE_CARD,
  DELETE_DECK,
  EDIT_DECK_TITLE,
  EDIT_DECK_DEFAULT_ORDER
} from '../actions'
import omit from 'lodash.omit'

const initialState = {}

export default function decks(state=initialState, {type, payload}){
  switch(type){
    case RECEIVE_DECKS:
      return {...payload}
    case ADD_DECK:
      return {
        ...state,
        [payload.deckId]: {
          title: payload.title,
          defaultOrder: []
        }
      }
    case ADD_CARD:
      return {
        ...state,
        [payload.deckId]: {
          ...state[payload.deckId],
          defaultOrder: state[payload.deckId].defaultOrder.concat([payload.cardId])
        }
      }
    case DELETE_CARD:
      return {
        ...state,
        [payload.deckId]: {
          ...state[payload.deckId],
          defaultOrder: state[payload.deckId].defaultOrder.filter( id => id!==payload.cardId )
        }
      }
    case EDIT_DECK_DEFAULT_ORDER:
      return {
        ...state,
        [payload.deckId]: {
          ...state[payload.deckId],
          defaultOrder: payload.defaultOrder
        }
      }
    case EDIT_DECK_TITLE:
      return {
        ...state,
        [payload.deckId]: {
          ...state[payload.deckId],
          title: payload.title
        }
      }
    case DELETE_DECK:
      return omit(state, payload.deckId)
    default:
      return state
  }
}
