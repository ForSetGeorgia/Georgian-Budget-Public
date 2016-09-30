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

const startLoadingBudgetItemFilter = () => ({
  type: 'START_LOADING_BUDGET_ITEM_FILTER'
})

const finishLoadingBudgetItemFilter = () => ({
  type: 'FINISH_LOADING_BUDGET_ITEM_FILTER'
})

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

const setBudgetItemType = (value) => ({
  type: 'SET_BUDGET_ITEM_TYPE',
  value: value
})

const beginLoadingData = () => ({
  type: 'BEGIN_LOADING_DATA'
})

const finishLoadingData = () => ({
  type: 'FINISH_LOADING_DATA'
})

const updateBudgetItems = () => (dispatch, getState) => {
  const state = getState()

  if (state.filters.budgetItems.selectedIds.length === 0) {
    dispatch(setBudgetItems([]))
    return
  }

  dispatch(beginLoadingData())

  axios.get(
    `${process.env.API_URL}/en/v1`,
    {
      params: {
        filters: {
          budgetItemType: state.filters.budgetItemType.value,
          financeType: state.filters.financeType.value
        },
        budgetItemIds: state.filters.budgetItems.selectedIds
      }
    }
  ).catch((error) => {
    dispatch(addError(`Error communicating with API: ${error}`))
  }).then((response) => {
    if (typeof response.data !== 'object') {
      dispatch(addError('Error communicating with API'))
      return
    }

    const errors = response.data.errors
    const budgetItems = response.data.budgetItems

    if (errors.length === 0) {
      dispatch(clearErrors())
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        dispatch(addError(error.text))
      })
    }

    if (budgetItems) {
      dispatch(setBudgetItems(budgetItems))
    }

    dispatch(finishLoadingData())
  })
}

const setBudgetItemFilterOptions = (options) => {
  return {
    type: 'SET_BUDGET_ITEM_FILTER_OPTIONS',
    options: options
  }
}

const updateBudgetItemFilterOptions = () => (dispatch, getState) => {
  const budgetItemType = getState().filters.budgetItemType.value

  dispatch(startLoadingBudgetItemFilter())
  axios.get(
    `${process.env.API_URL}/en/v1`,
    {
      params: {
        budgetItemFields: 'id,name',

        filters: {
          budgetItemType: budgetItemType
        }
      }
    }
  ).catch((error) => {
    dispatch(addError(`Error communicating with API: ${error}`))
  }).then((response) => {
    if (!response || !response.data || typeof response.data !== 'object') {
      dispatch(addError('Error communicating with API'))
      return
    }

    const errors = response.data.errors
    const budgetItems = response.data.budgetItems

    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        if (error.text) {
          dispatch(addError(error.text))
        } else {
          dispatch(addError('Error communicating with API'))
        }
      })
    }

    if (budgetItems) {
      const budgetItemFilterOptions = budgetItems.map((budgetItem) => {
        const option = {
          id: budgetItem.id,
          name: budgetItem.name
        }

        let errored = false

        if (typeof option.id !== 'number') {
          dispatch(addError('Budget item does not have valid id to use as option value'))
          errored = true
        }

        if (typeof option.name !== 'string') {
          dispatch(addError(`Budget item (id: ${option.name}) does not have valid name to use as option label`))
          errored = true
        }

        if (errored) return null

        return option
      }).filter((option) => option !== null && option !== undefined)

      dispatch(setBudgetItemFilterOptions(budgetItemFilterOptions))

      if (budgetItemType === 'total' && budgetItemFilterOptions.length > 0) {
        dispatch(setSelectedBudgetItemIds([budgetItemFilterOptions[0].id]))
        dispatch(updateBudgetItems())
      }

      dispatch(finishLoadingBudgetItemFilter())
    }
  })
}

module.exports = { addError, clearErrors, setBudgetItems, setSelectedBudgetItemIds, setFinanceType, setBudgetItemType, updateBudgetItems, updateBudgetItemFilterOptions }
