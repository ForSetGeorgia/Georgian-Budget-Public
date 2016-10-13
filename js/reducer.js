const { combineReducers } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducer = combineReducers({
  filters: require('js/reducers/filters'),
  data: require('js/reducers/data'),
  locale: require('js/reducers/locale'),
  messages: require('js/reducers/messages'),
  routing: routerReducer
})

module.exports = reducer
