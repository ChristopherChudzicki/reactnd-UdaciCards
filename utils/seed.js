import { uuid } from 'lodash-uuid'

function genMultCards(start=1, stop=10){
  const deckId = uuid()
  const cards = {}
  const defaultOrder = []
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      let id = uuid()
      cards[id] = {
        question: `What is ${j}*${k}?`,
        answer: `${j*k}`
      }
      defaultOrder.push(id)
    }
  }
  return {
    decks: {
      [deckId]: {
        title: 'Practice Multiplication',
        defaultOrder
      }
    },
    cards
  }
}

function genSumCards(start=1, stop=10){
  const deckId = uuid()
  const cards = {}
  const defaultOrder = []
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      let id = uuid()
      cards[id] = {
        question: `What is ${j} + ${k}?`,
        answer: `${j+k}`
      }
      defaultOrder.push(id)
    }
  }
  return {
    decks: {
      [deckId]: {
        title: 'Practice Addition',
        defaultOrder
      }
    },
    cards
  }
}

function genPowCards(start=1, stop=10){
  const deckId = uuid()
  const cards = {}
  const defaultOrder = []
  for (let j=start; j <= stop; j++){
    for (let k=start; k <= stop; k++){
      let id = uuid()
      cards[id] = {
        question: `What is ${j}^${k}?`,
        answer: `${j**k}`
      }
      defaultOrder.push(id)
    }
  }
  return {
    decks: {
      [deckId]: {
        title: 'Practice Exponents',
        defaultOrder
      }
    },
    cards
  }
}

function genDivCards(start=1, stop=10){
  const deckId = uuid()
  const cards = {}
  const defaultOrder = []
  for (let j=start; j <= stop; j++){
    for (let k=j; k <= stop; k++){
      let id = uuid()
      cards[id] = {
        question: `What is ${j*k}/${j}?`,
        answer: `${k}`
      }
      defaultOrder.push(id)
    }
  }
  return {
    decks: {
      [deckId]: {
        title: 'Practice Exponents',
        defaultOrder
      }
    },
    cards
  }
}

export function generateDummyDecks(){

  const data = [
    genMultCards(1, 12),
    genDivCards(1, 10),
    genPowCards(2, 6),
    genSumCards(2, 10),
  ]

  const decks = data.reduce( (acc, {decks}) => ({...acc, ...decks }), {})
  const cards = data.reduce( (acc, {cards}) => ({...acc, ...cards }), {})

  return {decks, cards}
}
