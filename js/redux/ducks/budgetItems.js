const { combineReducers } = require('redux')

module.exports = combineReducers({
  data: require('./budgetItems/data'),
  loading: require('./budgetItems/loading')
})
