import { SET_CONFIRM_STATE } from '../actions'

const initialState = {
  isVisible: false,
  title:'Confirm',
  message:'',
  data: {}
}

export default function confirmer(state=initialState, {type, payload}){
  switch(type){
    case SET_CONFIRM_STATE:
    return {...initialState, ...payload}

    default:
      return state
  }
}
