import { START_QUIZ } from './index'

export const startQuiz = (id) => ({
  type: START_QUIZ,
  payload: {id}
})
