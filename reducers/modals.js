import {
  SET_EDIT_DECK_VISIBILITY,
  SET_NEW_DECK_VISIBILITY,
  SET_EDIT_CARD_VISIBILITY,
  SET_NEW_CARD_VISIBILITY
  } from '../actions'

const initialState = {
  isNewDeckVisible: false,
  isEditDeckVisible: false,
  isNewCardVisible: false,
  isEditCardVisible: false,
  isConfirmVisible: false
}

export default function modals(state=initialState, {type, payload}){
  switch(type){
    case SET_EDIT_DECK_VISIBILITY:
    return {...state, isEditDeckVisible: payload.value}

    case SET_NEW_DECK_VISIBILITY:
    return {...state, isNewDeckVisible: payload.value}

    case SET_EDIT_CARD_VISIBILITY:
    return {...state, isEditCardVisible: payload.value}

    case SET_NEW_CARD_VISIBILITY:
    return {...state, isNewCardVisible: payload.value}

    default:
      return state
  }
}
