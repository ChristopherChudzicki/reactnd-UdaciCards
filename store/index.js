import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

const initialState = {}
const middleware = [
  thunk
]

// Dev tools debugger at http://remotedev.io/local/
const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
