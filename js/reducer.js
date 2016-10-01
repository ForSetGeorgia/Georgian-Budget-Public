const { combineReducers } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducer = combineReducers({
  filters: require('./reducers/filters'),
  data: require('./reducers/data'),
  locale: require('./reducers/locale'),
  routing: routerReducer
})

module.exports = reducer
