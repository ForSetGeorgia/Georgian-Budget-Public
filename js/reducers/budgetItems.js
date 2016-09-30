module.exports = (state = [], action) => {
  switch (action.type) {
    case 'SET_BUDGET_ITEMS':
      return action.budgetItems
    case 'SET_BUDGET_ITEM_TYPE':
      return []
    default: {
      return state
    }
  }
}
