const { createStore } = require('redux')

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case 'SET_ERROR': {
      return Object.assign(
        {},
        state,
        {
          error: action.error
        }
      )
    }
    case 'CLEAR_ERROR': {
      return Object.assign(
        {},
        state,
        {
          error: ''
        }
      )
    }
    case 'SET_BUDGET_ITEMS': {
      return Object.assign(
        {},
        state,
        {
          budgetItems: action.budgetItems
        }
      )
    }
    case 'SET_SELECTED_BUDGET_ITEM_ID': {
      return Object.assign(
        {},
        state,
        {
          selectedItem: action.selectedItem
        }
      )
    }
    default: {
      return state
    }
  }
}

const initialState = {
  selectedItem: 1,
  budgetItems: [],
  error: ''
}

const store = createStore(
  reducer,
  initialState,
  window.devToolsExtension && window.devToolsExtension()
)

module.exports = store
