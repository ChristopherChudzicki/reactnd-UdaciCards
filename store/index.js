import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools';
import getRootReducer from '../reducers'
import thunk from 'redux-thunk'

const initialState = {}
const middleware = [
  thunk
]

// Dev tools debugger at http://remotedev.io/local/
const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
)

export default function getStore(navReducer){
  return createStore(
    getRootReducer(navReducer),
    initialState,
    composedEnhancers
  )
}
