import {uuid} from 'lodash-uuid'

export const DECK_STORAGE_KEY = 'UdaciCards:decks'

function genMultQuestions(start=1, stop=10){
  const questions = {}
  const order = []
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      let id = uuid()
      questions[id] = {
        question: `What is ${j}*${k}?`,
        answer: `${j*k}`
      }
      order.push(id)
    }
  }
  return {title: 'Practice Multiplication', questions, order}
}

function genSumQuestions(start=1, stop=10){
  const questions = {}
  let order = []
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      let id = uuid()
      questions[id] = {
        question: `What is ${j} + ${k}?`,
        answer: `${j+k}`
      }
      order.push(id)
    }
  }
  return {title: 'Practice Addition', questions, order}
}

function genPowQuestions(start=1, stop=10){
  const questions = {}
  let order = []
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      let id = uuid()
      questions[id] = {
        question: `What is ${j}^${k}?`,
        answer: `${j**k}`
      }
      order.push(id)
    }
  }
  return {title: 'Practice Exponents', questions, order}
}

function genDivQuestions(start=1, stop=10){
  const questions = {}
  let order = []
  for (let j=start; j <= stop; j++){
    for (let k=j; k <= stop; k++){
      let id = uuid()
      questions[id] = {
        question: `What is ${j*k}/${j}?`,
        answer: `${k}`
      }
      order.push(id)
    }
  }
  return {title: 'Practice Division', questions, order}
}

export function generateDummyDecks(){
  const decks = {}

  decks[uuid()] = genMultQuestions(1, 12)

  decks[uuid()] = genDivQuestions(1, 10)

  decks[uuid()] = genPowQuestions(2, 6)

  decks[uuid()] = genSumQuestions(2, 10)

  return JSON.stringify(decks)
}
