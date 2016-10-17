const { combineReducers } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducer = combineReducers({
  filters: require('js/ducks/filters'),
  data: require('js/ducks/data'),
  locale: require('js/ducks/locale'),
  routing: routerReducer
})

module.exports = reducer
