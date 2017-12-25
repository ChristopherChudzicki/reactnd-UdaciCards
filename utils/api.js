import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, generateDummyDecks } from './_decks'

export function fetchDecksAsync() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then( JSON.parse )
}

export function addDeckAsync({title, id}){
  const entry = {
    title,
    questions: {},
    order: []
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
