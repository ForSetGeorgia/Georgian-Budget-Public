const axios = require('axios')

let errorIncrement = 0
const addError = function (text) {
  errorIncrement++

  return {
    type: 'ADD_ERROR',
    id: errorIncrement,
    text: text
  }
}

// eslint-disable-next-line handle-callback-err
const clearErrors = function (error) {
  return {
    type: 'CLEAR_ERRORS'
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

const updateBudgetItems = () => (dispatch, getState) => {
  const state = getState()

  axios.get(
    'https://dev-budgetapi.jumpstart.ge/en/api/v1',
    {
      params: {
        financeType: state.filters.financeType.value,
        budgetItemIds: state.filters.budgetItems.selectedIds
      }
    }
  ).then((response) => {
    if (response.error) {
      dispatch(addError(response.error))
    } else {
      dispatch(clearErrors())
    }
    if (response.data.budget_items) {
      dispatch(setBudgetItems(response.data.budget_items))
    }
  }).catch((error) => {
    dispatch(addError(`Error communicating with Server: ${error}`))
  })
}

module.exports = { addError, clearErrors, setBudgetItems, setSelectedBudgetItemIds, setFinanceType, updateBudgetItems }
