import { RECEIVE_DECKS, ADD_DECK } from '../actions'

const initialState = {
}

export default function decks(state=initialState, action){
  switch(action.type){
    case RECEIVE_DECKS:
      return {...action.payload}
    case ADD_DECK:
      return {
        ...state,
        [action.payload.id]: {
          title: action.payload.title,
          order: [],
          questions: {}
        }
      }
    default:
      return state
  }
}
