import { SET_CONFIRM_STATE } from '../actions'

const initialState = {
  deleteDeck: {
    isVisible: false,
    title:'Confirm',
    message:'',
    data: {}
  },
  deleteCard: {
    isVisible: false,
    title:'Confirm',
    message:'',
    data: {}
  }
}



export default function confirmer(state=initialState, {type, payload}){
  switch(type){
    case SET_CONFIRM_STATE:
    return {...state,
      [payload.id]: {
        ...state[payload.id],
        ...payload
      }
    }

    default:
      return state
  }
}
