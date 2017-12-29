import {
  SET_ACTIVE_DECK,
  SET_ACTIVE_CARD,
  TOGGLE_RANDOMIZE_QUESTION_ORDER,
  SUBMIT_QUESTION_SCORE,
  TOGGLE_ANSWER_VISIBILITY,
  SET_ANSWER_VISIBILITY,
  SET_QUIZ_ORDER
} from '../actions'

const initialState = {
  activeDeckId: null,
  activeCardId: null, // only used by the card editor, not by swiper
  order: [],
  grades: {},
  answerVisibility: {},
  isRandomOrder: false
}

export default function quiz(state=initialState, {type, payload}){
  switch(type){
    case SET_ACTIVE_DECK:
      return {
        ...initialState,
        activeDeckId: payload.id
      }
    case SET_ACTIVE_CARD:
      return {
        ...state,
        activeCardId: payload.id
      }
    case SET_QUIZ_ORDER:
      return {
        ...state,
        order:payload.order
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
          [payload.id]: payload.isCorrect
        }
      }
    case TOGGLE_ANSWER_VISIBILITY:
      return {
        ...state,
        answerVisibility: {
          ...state.answerVisibility,
          [payload.id]: !state.answerVisibility[payload.id]
        }
      }
    case SET_ANSWER_VISIBILITY:
      return {
        ...state,
        answerVisibility: {
          ...state.answerVisibility,
          [payload.id]: payload.visibility
        }
      }
    default:
      return state
  }
}
