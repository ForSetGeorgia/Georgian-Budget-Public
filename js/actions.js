const setError = function (error) {
  return {
    type: 'SET_ERROR',
    error: error
  }
}

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

module.exports = { setError, clearError, setBudgetItems }
