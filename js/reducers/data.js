const { combineReducers } = require('redux')

module.exports = combineReducers({
  budgetItems: require('./data/budgetItems'),
  errors: require('js/ducks/data/errors'),
  loading: require('js/ducks/data/loading')
})
