import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from './index'
import { uuid } from 'lodash-uuid'
import { addDeckAsync, addCardAsync } from '../utils/api'

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

export const addCard = ({question, answer, deckId}) => {
  return dispatch => {
    const cardId = uuid()
    dispatch({
      type:ADD_CARD,
      payload:{cardId, deckId, question, answer}
    })

    addCardAsync({question, answer, deckId, cardId})
  }
}
