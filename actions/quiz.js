import { ACTIVATE_QUIZ, TOGGLE_RANDOMIZE_QUESTION_ORDER } from './index'

export const activateQuiz = (id) => ({
  type: ACTIVATE_QUIZ,
  payload: {id}
})

export const toggleRandomizeQuestionOrder = () => ({
  type: TOGGLE_RANDOMIZE_QUESTION_ORDER
})
