const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const ADD_ERROR = 'georgianBudget/budgetItems/errors/ADD_ERROR'
const CLEAR_ERRORS = 'georgianBudget/budgetItems/errors/CLEAR_ERRORS'

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ERROR: {
      let errorAlreadyExists = false
      for (var i = 0; i < state.length; i++) {
        errorAlreadyExists = state[i].text === action.text
        if (errorAlreadyExists) break
      }

      if (errorAlreadyExists) {
        return state
      } else {
        return state.concat({
          show: true,
          id: action.id,
          text: action.text
        })
      }
    }
    case CLEAR_ERRORS: {
      return []
    }
    default: {
      return state
    }
  }
}

let errorIncrement = 0
reducer.addBudgetItemsError = function (text, id = errorIncrement++) {
  return {
    type: ADD_ERROR,
    id: id,
    text: text
  }
}

// eslint-disable-next-line handle-callback-err
reducer.clearBudgetItemsErrors = function (error) {
  return {
    type: CLEAR_ERRORS
  }
}

reducer.getErrors = createSelector(
  rootSelector,
  ({errors}) => errors
)

module.exports = reducer
