const budgetItems = (state = [], action) => {
  switch (action.type) {
    case 'SET_BUDGET_ITEMS': {
      return action.budgetItems
    }
    default: {
      return state
    }
  }
}

const error = (state = '', action) => {
  switch (action.type) {
    case 'SET_ERROR': {
      return action.error
    }
    case 'CLEAR_ERROR': {
      return ''
    }
    default: {
      return state
    }
  }
}

const selectedItem = (state = 1, action) => {
  switch (action.type) {
    case 'SET_SELECTED_BUDGET_ITEM_ID': {
      return action.selectedItem
    }
    default: {
      return state
    }
  }
}

module.exports = { error, budgetItems, selectedItem }
