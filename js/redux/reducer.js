const { combineReducers } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducer = combineReducers({
  filters: require('./ducks/filters'),
  budgetItems: require('./ducks/budgetItems'),
  errors: require('./ducks/errors'),
  explore: require('./ducks/explore'),
  locale: require('./ducks/locale'),
  routing: routerReducer,
  spentFinances: require('./ducks/spentFinances')
})

module.exports = reducer
