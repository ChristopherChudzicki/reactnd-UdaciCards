import { AsyncStorage } from 'react-native'
import { generateDummyDecks } from './seed.js'
import omit from 'lodash.omit'

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

export function addDeckAsync(deckId, title){
  const entry = {
    title,
    questions: {},
    defaultOrder: []
  }
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deckId]: entry
  }))
}

export function editDeckAsync(deckId, payload){
  fetchDeckAsync(deckId).then(
    deck => {
      const editedDeck = {...deck, ...payload}
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [deckId]: editedDeck
      }))
    }
  )
}

export function editCardAsync(cardId, payload){
  fetchDeckAsync(cardId).then(
    card => {
      const editedCard = {...card, ...payload}
      AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
        [cardId]: editedCard
      }))
    }
  )
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

export function deleteCardAsync({cardId, deckId}){
  return fetchDeckAsync(deckId).then(
    deck => {
      const defaultOrder = deck.defaultOrder.filter( id => id!==cardId )
      editDeckAsync(deckId, {defaultOrder})
    }
  ).then(
    fetchCardsAsync().then(
      cards => AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(
        omit(cards, cardId)
      ) )
    )
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
