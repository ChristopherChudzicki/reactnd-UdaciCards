import {
  RECEIVE_CARDS,
  EDIT_CARD,
  ADD_CARD,
  DELETE_CARD
} from './index'
import { addCardAsync, editCardAsync, deleteCardAsync } from '../utils/api'

export function receiveCards(cards){
  return {
    type: RECEIVE_CARDS,
    payload: cards
  }
}

export const addCard = ({question, answer, deckId, cardId}) => {
  return dispatch => {
    dispatch({
      type:ADD_CARD,
      payload:{cardId, deckId, question, answer}
    })

    addCardAsync({question, answer, deckId, cardId})
  }
}

export const editCard = ({question, answer, deckId, cardId}) => {
  return dispatch => {
    dispatch({
      type:EDIT_CARD,
      payload:{cardId, deckId, question, answer}
    })

    editCardAsync(cardId, {question, answer})
  }
}

export const deleteCard = ({cardId, deckId}) => {
  return dispatch => {
    dispatch({
      type: DELETE_CARD,
      payload: {cardId, deckId}
    })

    deleteCardAsync({cardId, deckId})
  }
}
