import {uuid} from 'lodash-uuid'

export const DECK_STORAGE_KEY = 'UdaciCards:decks'

function genMultQuestions(start=1, stop=10){
  const questions = {}
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      questions[uuid()] = {
        question: `What is ${j}*${k}?`,
        answer: `${j*k}`
      }
    }
  }
  return questions
}

function genSumQuestions(start=1, stop=10){
  const questions = {}
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      questions[uuid()] = {
        question: `What is ${j} + ${k}?`,
        answer: `${j+k}`
      }
    }
  }
  return questions
}

function genPowQuestions(start=1, stop=10){
  const questions = {}
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      questions[uuid()] = {
        question: `What is ${j}^${k}?`,
        answer: `${j+k}`
      }
    }
  }
  return questions
}

function genDivQuestions(start=1, stop=10){
  const questions = {}
  for (let j=start; j <= stop; j++){
    for (let k=j; k <= stop; k++){
      questions[uuid()] = {
        question: `What is ${k*j}/${j}?`,
        answer: `${k}`
      }
    }
  }
  return questions
}

export function generateDummyDecks(){
  const decks = {}

  decks[uuid()] = {
    title: 'Practice Multiplication',
    questions: genMultQuestions(1, 12)
  }

  decks[uuid()] = {
    title: 'Practice Division',
    questions: genDivQuestions(1, 10)
  }

  decks[uuid()] = {
    title: 'Practice Exponents',
    questions: genPowQuestions(2, 6)
  }

  decks[uuid()] = {
    title: 'Practice Addition',
    questions: genSumQuestions(2, 10)
  }

  return JSON.stringify(decks)
}
