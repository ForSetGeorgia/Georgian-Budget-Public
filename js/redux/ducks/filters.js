const { combineReducers } = require('redux')

module.exports = combineReducers({
  budgetItemType: require('./filters/budgetItemType'),
  financeType: require('./filters/financeType')
})
