import { RECEIVE_DECKS, ADD_DECK } from './index'
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
