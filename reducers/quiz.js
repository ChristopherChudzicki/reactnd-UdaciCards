import {
  ACTIVATE_QUIZ,
  TOGGLE_RANDOMIZE_QUESTION_ORDER,
  SUBMIT_QUESTION_SCORE
} from '../actions'

const initialState = {
  activeDeckId: null,
  grades: {},
  isRandomOrder: false
}

export default function quiz(state=initialState, action){
  switch(action.type){
    case ACTIVATE_QUIZ:
      return {
        ...state,
        activeDeckId: action.payload.id
      }
    case TOGGLE_RANDOMIZE_QUESTION_ORDER:
      return {
        ...state,
        isRandomOrder: !state.isRandomOrder
      }
    case SUBMIT_QUESTION_SCORE:
      return {
        ...state,
        grades: {
          ...state.grades,
          [action.payload.id]: action.payload.isCorrect
        }
      }
    default:
      return state
  }
}
