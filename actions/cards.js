import {
  RECEIVE_CARDS,
  // ADD_CARD
} from './index'

export function receiveCards(cards){
  return {
    type: RECEIVE_CARDS,
    payload: cards
  }
}
