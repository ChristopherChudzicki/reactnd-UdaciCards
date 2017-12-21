import uuid from 'lodash-uuid'
import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, generateDummyDecks } from './_decks'

export function fetchDecksAsync() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then( JSON.parse )
}

export function clearDecksAsync(){
  return AsyncStorage.setItem(DECK_STORAGE_KEY, null)
}

export function resetDecksToDummyAsync(){
  return AsyncStorage.setItem(DECK_STORAGE_KEY, generateDummyDecks())
}
