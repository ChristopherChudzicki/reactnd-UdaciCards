import {
  SET_EDIT_DECK_VISIBILITY,
  SET_NEW_DECK_VISIBILITY,
  SET_EDIT_CARD_VISIBILITY,
  SET_NEW_CARD_VISIBILITY,
} from './index'

export const setEditDeckVisibility = (value) => ({
  type: SET_EDIT_DECK_VISIBILITY,
  payload: {value}
})

export const setNewDeckVisibility = (value) => ({
  type: SET_NEW_DECK_VISIBILITY,
  payload: {value}
})

export const setEditCardVisibility = (value) => ({
  type: SET_EDIT_CARD_VISIBILITY,
  payload: {value}
})

export const setNewCardVisibility = (value) => ({
  type: SET_NEW_CARD_VISIBILITY,
  payload: {value}
})
