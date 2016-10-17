const SET_BUDGET_ITEMS = 'georgianBudget/data/budgetItems/SET_BUDGET_ITEMS'

const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_BUDGET_ITEMS:
      return action.budgetItems
    default: {
      return state
    }
  }
}

reducer.setBudgetItems = function (budgetItems) {
  return {
    type: SET_BUDGET_ITEMS,
    budgetItems: budgetItems
  }
}

module.exports = reducer
