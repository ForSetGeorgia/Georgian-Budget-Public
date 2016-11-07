const { combineReducers } = require('redux')

module.exports = combineReducers({
  budgetItems: require('./filters/budgetItems'),
  budgetItemType: require('./filters/budgetItemType'),
  financeType: require('./filters/financeType'),
  timePeriodType: require('./filters/timePeriodType')
})
