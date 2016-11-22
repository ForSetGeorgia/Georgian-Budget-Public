const { combineReducers } = require('redux')

const reducer = combineReducers({
  details: require('./explore/details')
})

module.exports = reducer
