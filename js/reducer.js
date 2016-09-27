const { combineReducers } = require('redux')
const { routerReducer } = require('react-router-redux')

const reducers = {
  error: require('./reducers/error'),
  budgetItems: require('./reducers/budgetItems'),
  selectedItem: require('./reducers/selectedItem')
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
