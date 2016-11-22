const { combineReducers } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducer = combineReducers({
  filters: require('./ducks/filters'),
  budgetItems: require('./ducks/budgetItems'),
  errors: require('./ducks/errors'),
  exploreDetails: require('./ducks/exploreDetails'),
  locale: require('./ducks/locale'),
  routing: routerReducer
})

module.exports = reducer
