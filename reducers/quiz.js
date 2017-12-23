import { START_QUIZ } from '../actions'

const initialState = {
  activeDeckId: null,
  grades: {}
}

export default function quiz(state=initialState, action){
  switch(action.type){
    case START_QUIZ:
      return {
        ...state,
        activeDeckId: action.payload.id
      }
    default:
      return state
  }
}
