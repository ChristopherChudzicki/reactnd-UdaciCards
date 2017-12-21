import { RECEIVE_DECKS } from '../actions'

const initialState = {
  data: []
}

export default function decks(state=initialState, action){
  switch(action.type){
    case RECEIVE_DECKS:
      return {
        ...state,
        data: action.payload
      }

    default:
      return state
  }
}
