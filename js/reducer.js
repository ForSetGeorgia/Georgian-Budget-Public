const { combineReducers } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducers = {
  filters: require('./reducers/filters'),
  data: require('./reducers/data')
}

const reducer = combineReducers(
  Object.assign(
    {},
    reducers,
    {
      routing: routerReducer
    }
  )
)

module.exports = reducer
