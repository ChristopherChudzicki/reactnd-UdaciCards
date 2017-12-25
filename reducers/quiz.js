import {
  ACTIVATE_QUIZ,
  TOGGLE_RANDOMIZE_QUESTION_ORDER,
  SUBMIT_QUESTION_SCORE,
  TOGGLE_ANSWER_VISIBILITY,
  SET_ANSWER_VISIBILITY,
  SET_QUIZ_ORDER
} from '../actions'

const initialState = {
  activeDeckId: null,
  grades: {},
  answerVisibility: {},
  isRandomOrder: false
}

export default function quiz(state=initialState, action){
  switch(action.type){
    case ACTIVATE_QUIZ:
      return {
        grades:{},
        answerVisibility:{},
        isRandomOrder:false,
        activeDeckId: action.payload.id
      }
    case SET_QUIZ_ORDER:
      return {
        ...state,
        order:action.payload.order
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
    case TOGGLE_ANSWER_VISIBILITY:
      return {
        ...state,
        answerVisibility: {
          ...state.answerVisibility,
          [action.payload.id]: !state.answerVisibility[action.payload.id]
        }
      }
    case SET_ANSWER_VISIBILITY:
      return {
        ...state,
        answerVisibility: {
          ...state.answerVisibility,
          [action.payload.id]: action.payload.visibility
        }
      }
    default:
      return state
  }
}
