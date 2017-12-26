import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

const initialState = {
}

export default function decks(state=initialState, {type, payload}){
  switch(type){
    case RECEIVE_DECKS:
      return {...payload}
    case ADD_DECK:
      return {
        ...state,
        [payload.id]: {
          title: payload.title,
          defaultOrder: [],
          questions: {}
        }
      }
    case ADD_CARD:
      return {
        ...state,
        [payload.deckId]: {
          ...state[payload.deckId],
          questions: {
            ...state[payload.deckId].questions,
            [payload.cardId]: {
              question: payload.question,
              answer: payload.answer
            }
          },
          defaultOrder: state[payload.deckId].defaultOrder.concat([payload.cardId])
        }
      }
    default:
      return state
  }
}
