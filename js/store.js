const { compose, createStore } = require('redux')
const initialState = require('./initialState')

const reducer = require('./reducer')

const store = createStore(
  reducer,
  initialState,
  compose(
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
  )
)

module.exports = store
