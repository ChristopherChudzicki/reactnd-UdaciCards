import {
  ACTIVATE_QUIZ,
  TOGGLE_RANDOMIZE_QUESTION_ORDER,
  SUBMIT_QUESTION_SCORE,
  TOGGLE_ANSWER_VISIBILITY
  } from './index'

export const activateQuiz = (id) => ({
  type: ACTIVATE_QUIZ,
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
