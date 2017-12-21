import { START_QUIZ } from '../actions'

const initialState = {
  activeDeckId: null,
  activeQuestionIdx: null,
  grades: {}
}

export default function quiz(state=initialState, action){
  switch(action.type){
    case START_QUIZ:
      return {
        ...state,
        activeDeckId: action.payload.id,
        activeQuestionIdx: 0
      }
    default:
      return state
  }
}
