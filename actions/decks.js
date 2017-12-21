import { RECEIVE_DECKS } from './index'

export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    payload: decks
  }
}
