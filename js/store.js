const { compose, createStore, applyMiddleware } = require('redux')
const initialState = require('./initialState')
const thunk = require('redux-thunk').default

const reducer = require('./reducer')

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
  )
)

module.exports = store
