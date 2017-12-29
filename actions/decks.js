import {
  RECEIVE_DECKS,
  ADD_DECK,
  EDIT_DECK_ORDER
} from './index'
import { uuid } from 'lodash-uuid'
import { addDeckAsync } from '../utils/api'

export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    payload: decks
  }
}

export function addDeck(title){
  return dispatch => {
    const id = uuid()
    dispatch({
      type: ADD_DECK,
      payload: {title, id}
    })

    addDeckAsync({id, title})

  }
}

export const editDeckOrder = ({deckId, order}) => {
  return dispatch => {
    dispatch({
      type: EDIT_DECK_ORDER,
      payload: {
        deckId,
        defaultOrder: order
      }
    })
  }
}
