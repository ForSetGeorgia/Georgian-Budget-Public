const { combineReducers } = require('redux')

module.exports = combineReducers({
  budgetItems: require('./data/budgetItems'),
  errors: require('./data/errors'),
  loading: require('./data/loading')
})
