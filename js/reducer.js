const { combineReducers } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducers = {
  filters: require('./reducers/filters'),
  errors: require('./reducers/errors'),
  budgetItems: require('./reducers/budgetItems')
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
