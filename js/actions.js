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

const setSelectedBudgetItemIds = function (ids) {
  return {
    type: 'SET_SELECTED_BUDGET_ITEM_IDS',
    ids: ids
  }
}

const setFinanceType = function (value) {
  return {
    type: 'SET_FINANCE_TYPE',
    value: value
  }
}

module.exports = { setError, clearError, setBudgetItems, setSelectedBudgetItemIds, setFinanceType }
