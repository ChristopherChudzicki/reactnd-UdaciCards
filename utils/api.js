import { AsyncStorage } from 'react-native'
import { generateDummyDecks } from './seed.js'
import { Notifications, Permissions } from 'expo'
import omit from 'lodash.omit'

const RUN_BEFORE_KEY = 'UdaciCards:runBefore'
const DECK_STORAGE_KEY = 'UdaciCards:decks'
const CARD_STORAGE_KEY = 'UdaciCards:cards'
const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function isAppPristineAsync() {
  return AsyncStorage.getItem(RUN_BEFORE_KEY)
  .then(JSON.parse)
  .then( data => {
    if (data === null){
      AsyncStorage.setItem(RUN_BEFORE_KEY, JSON.stringify({
        'hasRunBefore': true
      }) )
      return true
    }
    else {
      return false
    }
  }
)}

export function clearAllAsync(){
  return clearLocalNotificationAsync()
    .then( () => AsyncStorage.removeItem(DECK_STORAGE_KEY))
    .then( () => AsyncStorage.removeItem(CARD_STORAGE_KEY))
    .then( () => AsyncStorage.removeItem(RUN_BEFORE_KEY))
}

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

export function deleteDeckAsync({deckId, cardIdList}){
  return fetchDecksAsync().then(
    decks => AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(
      omit(decks, deckId)
    ))
  ).then(
    fetchCardsAsync().then(
      cards => AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(
        omit(cards, cardIdList)
      ))
    )
  )
}

export function resetStorage(){
  const {decks, cards} = generateDummyDecks()
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(cards))
  clearLocalNotificationAsync().then(setLocalNotificationAsync)
  return {decks, cards}
}

export function clearLocalNotificationAsync() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Study!',
    body: "👋 don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotificationAsync() {
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let time = new Date()
              time.setDate(time.getDate() + 1)
              time.setHours(22)
              time.setMinutes(31)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: time,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
