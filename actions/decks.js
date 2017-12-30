import {
  RECEIVE_DECKS,
  ADD_DECK,
  DELETE_DECK,
  EDIT_DECK_TITLE,
  EDIT_DECK_DEFAULT_ORDER
} from './index'
import { addDeckAsync, editDeckAsync, deleteDeckAsync } from '../utils/api'

export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    payload: decks
  }
}

export function addDeck({deckId, title}){
  return dispatch => {
    dispatch({
      type: ADD_DECK,
      payload: {title, deckId}
    })

    addDeckAsync(deckId, title)
  }
}

export const editDeckDefaultOrder = ({deckId, defaultOrder}) => {
  return dispatch => {
    dispatch({
      type: EDIT_DECK_DEFAULT_ORDER,
      payload: {
        deckId,
        defaultOrder
      }
    })

    editDeckAsync(deckId, {defaultOrder})
  }
}

export const editDeckTitle = ({deckId, title}) => {
  return dispatch => {
    dispatch({
      type: EDIT_DECK_TITLE,
      payload: {deckId, title}
    })

    editDeckAsync(deckId, {title})
  }
}

export const deleteDeck = ({deckId, cardIdList}) => {
  return dispatch => {
    dispatch({
      type: DELETE_DECK,
      payload: {deckId, cardIdList}
    })

    deleteDeckAsync({deckId, cardIdList})
  }
}
