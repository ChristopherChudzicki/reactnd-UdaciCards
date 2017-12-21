import {uuid} from 'lodash-uuid'
import range from 'lodash.range'

export const DECK_STORAGE_KEY = 'UdaciCards:decks'

export function generateDummyDecks(decksNum=4, questionsNum=10){

  const decks = range(decksNum).reduce( (acc, d) => ({
    ...acc,
    [uuid()]: {
      title: `Deck ${d}`,
      questions: range(questionsNum).map( q => ({
        question: `What is ${d}+${q}?`,
        answer: `${d}+${q}=${d+q}.`
      }))
      }
    }) , {} )

  return JSON.stringify(decks)
}
