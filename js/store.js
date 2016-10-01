const { compose, createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default

const store = createStore(
  require('js/reducer'),
  require('js/initialState'),
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
  )
)

module.exports = store
