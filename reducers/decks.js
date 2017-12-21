import { RECEIVE_DECKS } from '../actions'

const initialState = {
}

export default function decks(state=initialState, action){
  switch(action.type){
    case RECEIVE_DECKS:
      return {...action.payload}

    default:
      return state
  }
}
