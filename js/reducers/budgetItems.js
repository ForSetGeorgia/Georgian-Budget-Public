module.exports = (state = [], action) => {
  switch (action.type) {
    case 'SET_BUDGET_ITEMS': {
      return action.budgetItems
    }
    default: {
      return state
    }
  }
}
