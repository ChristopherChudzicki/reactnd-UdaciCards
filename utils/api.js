import { AsyncStorage } from 'react-native'
import { generateDummyDecks } from './seed.js'

export const DECK_STORAGE_KEY = 'UdaciCards:decks'
export const CARD_STORAGE_KEY = 'UdaciCards:cards'

export function fetchDecksAsync() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then( JSON.parse )
}

export function fetchCardsAsync() {
  return AsyncStorage.getItem(CARD_STORAGE_KEY).then( JSON.parse )
}

export function fetchDeckAsync(id){
  return fetchDecksAsync()
    .then(result => result[id] )
}

export function addDeckAsync({title, id}){
  const entry = {
    title,
    questions: {},
    defaultOrder: []
  }
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [id]: entry
  }))
}

export function editCardAsync({question, answer, cardId}){
  AsyncStorage.mergeItem(CARD_STORAGE_KEY,JSON.stringify({
    [cardId]: {question, answer}
  }))
}

export function addCardAsync({question, answer, cardId, deckId}){
  fetchDeckAsync(deckId)
    .then( deck => {
      deck.defaultOrder.push(cardId)
      return deck
    })
    .then(
      modifiedDeck => AsyncStorage.mergeItem(DECK_STORAGE_KEY,
        JSON.stringify({[deckId]:modifiedDeck})
      )
    )
    .then(
      () => AsyncStorage.mergeItem(CARD_STORAGE_KEY,JSON.stringify({
        [cardId]: {question, answer}
      }))
    )
}

export function clearDecksAsync(){
  return AsyncStorage.removeItem(DECK_STORAGE_KEY)
}

export function resetStorageToDummy(){
  const {decks, cards} = generateDummyDecks()
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(cards))
  return {decks, cards}
}
