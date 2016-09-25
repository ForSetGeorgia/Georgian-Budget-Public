const { combineReducers, compose, createStore } = require('redux')
const reducers = require('./reducers')

const reducer = combineReducers(reducers)

const initialState = {
  selectedItem: 1,
  budgetItems: [],
  error: ''
}

const store = createStore(
  reducer,
  initialState,
  compose(
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
  )
)

module.exports = store
