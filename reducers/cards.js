import { RECEIVE_CARDS, ADD_CARD, EDIT_CARD } from '../actions/index'

const initialState = {}

export default function cards(state=initialState, {type, payload}){
  switch(type){
    case RECEIVE_CARDS:
      return {...payload}
    case ADD_CARD:
      return {
        ...state,
        [payload.cardId]: {
          question: payload.question,
          answer: payload.answer
        }
      }
    case EDIT_CARD:
      return {
        ...state,
        [payload.cardId]: {
          question: payload.question,
          answer: payload.answer
        }
      }
    default:
      return state
  }
}
