const { combineReducers } = require('redux')

module.exports = combineReducers({
  data: require('./budgetItems/data'),
  errors: require('./budgetItems/errors'),
  loading: require('./budgetItems/loading')
})
