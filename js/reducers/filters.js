const { combineReducers } = require('redux')

module.exports = combineReducers({
  budgetItems: require('./filters/budgetItems'),
  financeType: require('./filters/financeType')
})
