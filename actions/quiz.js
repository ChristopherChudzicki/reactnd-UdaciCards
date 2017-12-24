import {
  ACTIVATE_QUIZ,
  TOGGLE_RANDOMIZE_QUESTION_ORDER,
  SUBMIT_QUESTION_SCORE
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
