import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './auth'
import { errorReducer } from './errors'
import { routesReducer } from './routes'
import { uiReducer } from './ui'

const rootReducer = combineReducers({
  auth: authReducer,
  routes: routesReducer,
  errors: errorReducer,
  ui: uiReducer,
})

let enhancer

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk)
} else {
  const logger = require('redux-logger').default
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  enhancer = composeEnhancers(applyMiddleware(thunk, logger))
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore
