import {uuid} from 'lodash-uuid'

export const DECK_STORAGE_KEY = 'UdaciCards:decks'

function genMultQuestions(start=1, stop=10){
  const questions = {}
  const defaultOrder = []
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      let id = uuid()
      questions[id] = {
        question: `What is ${j}*${k}?`,
        answer: `${j*k}`
      }
      defaultOrder.push(id)
    }
  }
  return {title: 'Practice Multiplication', questions, defaultOrder}
}

function genSumQuestions(start=1, stop=10){
  const questions = {}
  const defaultOrder = []
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      let id = uuid()
      questions[id] = {
        question: `What is ${j} + ${k}?`,
        answer: `${j+k}`
      }
      defaultOrder.push(id)
    }
  }
  return {title: 'Practice Addition', questions, defaultOrder}
}

function genPowQuestions(start=1, stop=10){
  const questions = {}
  const defaultOrder = []
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      let id = uuid()
      questions[id] = {
        question: `What is ${j}^${k}?`,
        answer: `${j**k}`
      }
      defaultOrder.push(id)
    }
  }
  return {title: 'Practice Exponents', questions, defaultOrder}
}

function genDivQuestions(start=1, stop=10){
  const questions = {}
  const defaultOrder = []
  for (let j=start; j <= stop; j++){
    for (let k=j; k <= stop; k++){
      let id = uuid()
      questions[id] = {
        question: `What is ${j*k}/${j}?`,
        answer: `${k}`
      }
      defaultOrder.push(id)
    }
  }
  return {title: 'Practice Division', questions, defaultOrder}
}

export function generateDummyDecks(){
  const decks = {}

  decks[uuid()] = genMultQuestions(1, 12)

  decks[uuid()] = genDivQuestions(1, 10)

  decks[uuid()] = genPowQuestions(2, 6)

  decks[uuid()] = genSumQuestions(2, 10)

  return JSON.stringify(decks)
}
