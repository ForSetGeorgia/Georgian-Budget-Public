const { combineReducers } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducer = combineReducers({
  filters: require('js/reducers/filters'),
  data: require('js/reducers/data'),
  locale: require('js/ducks/locale'),
  routing: routerReducer
})

module.exports = reducer
