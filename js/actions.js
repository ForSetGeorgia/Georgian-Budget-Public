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

const setSelectedBudgetItemId = function (selectedItem) {
  return {
    type: 'SET_SELECTED_BUDGET_ITEM_ID',
    selectedItem: selectedItem
  }
}

module.exports = { setError, clearError, setBudgetItems, setSelectedBudgetItemId }
