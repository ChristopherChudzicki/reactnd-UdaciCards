import {
  SET_ACTIVE_DECK,
  SET_ACTIVE_CARD,
  TOGGLE_RANDOMIZE_QUESTION_ORDER,
  SUBMIT_QUESTION_SCORE,
  TOGGLE_ANSWER_VISIBILITY,
  SET_ANSWER_VISIBILITY,
  SET_QUIZ_ORDER,
  } from './index'

export const setActiveDeck = (id) => ({
  type: SET_ACTIVE_DECK,
  payload: {id}
})

export const setActiveCard = (id) => ({
  type: SET_ACTIVE_CARD,
  payload: {id}
})

export const toggleRandomizeQuestionOrder = () => ({
  type: TOGGLE_RANDOMIZE_QUESTION_ORDER
})

export const submitQuestionScore = ({id, isCorrect}) => {
  return {
    type: SUBMIT_QUESTION_SCORE,
    payload: {id, isCorrect}
  }
}

export const toggleAnswerVisibility = (id) => ({
  type: TOGGLE_ANSWER_VISIBILITY,
  payload: {id}
})

export const setAnswerVisibility = ({id, visibility}) => ({
  type: SET_ANSWER_VISIBILITY,
  payload: {id, visibility}
})

export const setQuizOrder = (order) => ({
  type: SET_QUIZ_ORDER,
  payload: {order}
})
