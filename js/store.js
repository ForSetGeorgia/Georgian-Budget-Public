const { combineReducers, compose, createStore } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducers = require('./reducers')

const reducer = combineReducers(
  Object.assign(
    {},
    reducers,
    {
      routing: routerReducer
    }
  )
)

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
