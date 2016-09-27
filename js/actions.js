const setError = function (text) {
  return {
    type: 'SET_ERROR',
    error: text
  }
}

// eslint-disable-next-line handle-callback-err
const clearError = function (error) {
  return {
    type: 'CLEAR_ERROR'
  }
}

const setBudgetItems = function (budgetItems) {
  return {
    type: 'SET_BUDGET_ITEMS',
    budgetItems: budgetItems
  }
}

const selectBudgetItemId = function (id) {
  return {
    type: 'SELECT_BUDGET_ITEM_ID',
    id: id
  }
}

module.exports = { setError, clearError, setBudgetItems, selectBudgetItemId }
