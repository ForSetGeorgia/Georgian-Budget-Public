const { combineReducers } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducer = combineReducers({
  filters: require('js/ducks/filters'),
  budgetItems: require('js/ducks/budgetItems'),
  locale: require('js/ducks/locale'),
  routing: routerReducer
})

module.exports = reducer
