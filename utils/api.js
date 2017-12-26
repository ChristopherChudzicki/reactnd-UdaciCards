import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, generateDummyDecks } from './_decks'

export function fetchDecksAsync() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then( JSON.parse )
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

export function clearDecksAsync(){
  return AsyncStorage.removeItem(DECK_STORAGE_KEY)
}

export function resetDecksToDummyAsync(){
  return AsyncStorage.setItem(DECK_STORAGE_KEY, generateDummyDecks())
}

export function addCardAsync({question, answer, cardId, deckId}){
  const entry = {
    question,
    answer
  }
  fetchDeckAsync(deckId)
    .then( deck => {
      deck.questions[cardId] = entry
      deck.defaultOrder.push(cardId)
      return deck
    })
    .then(
      modifiedDeck => AsyncStorage.mergeItem(DECK_STORAGE_KEY,
        JSON.stringify({[deckId]:modifiedDeck})
      )
    )
}
