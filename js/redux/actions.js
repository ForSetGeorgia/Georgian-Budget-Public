const { addBudgetItemsError, clearBudgetItemsErrors } = require('./ducks/budgetItems/errors')

const {
  startLoadingBudgetItemFilter,
  finishLoadingBudgetItemFilter,
  setSelectedBudgetItemIds,
  setBudgetItemFilterOptions
} = require('./ducks/filters/budgetItems')

const { beginLoadingBudgetItems, finishLoadingBudgetItems } = require('./ducks/budgetItems/loading')
const { setBudgetItems } = require('./ducks/budgetItems/data')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

const updateBudgetItems = () => (dispatch, getState) => {
  const state = getState()
  const locale = state.locale
  const budgetItemType = state.filters.budgetItemType.value
  const financeType = state.filters.financeType.value
  const budgetItemIds = state.filters.budgetItems.selectedIds

  if (budgetItemIds.length === 0) {
    dispatch(setBudgetItems([]))
    return
  }

  const requiredState = [locale, budgetItemType, financeType, budgetItemIds]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  dispatch(beginLoadingBudgetItems())

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      filters: {
        budgetItemType: budgetItemType,
        financeType: financeType
      },
      budgetItemIds: budgetItemIds
    }
  }).catch((error) => {
    dispatch(addBudgetItemsError(`Error communicating with API: ${error}`))
  }).then((response) => {
    dispatch(clearBudgetItemsErrors())

    if (typeof response.data !== 'object') {
      dispatch(addBudgetItemsError('Error communicating with API'))
      return
    }

    const errors = response.data.errors
    const budgetItems = response.data.budgetItems

    if (errors.length > 0) {
      errors.forEach((error) => {
        dispatch(addBudgetItemsError(error.text))
      })
    }

    if (budgetItems) {
      dispatch(setBudgetItems(budgetItems))
    }

    dispatch(finishLoadingBudgetItems())
  })
}

const updateBudgetItemFilterOptions = () => (dispatch, getState) => {
  const state = getState()

  const locale = state.locale
  const budgetItemType = state.filters.budgetItemType.value

  const requiredState = [locale, budgetItemType]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  dispatch(startLoadingBudgetItemFilter())

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      budgetItemFields: 'id,name',

      filters: {
        budgetItemType: budgetItemType
      }
    }
  }).catch((error) => {
    dispatch(addBudgetItemsError(`Error communicating with API: ${error}`))
  }).then((response) => {
    if (!response || !response.data || typeof response.data !== 'object') {
      dispatch(addBudgetItemsError('Error communicating with API'))
      return
    }

    const errors = response.data.errors
    const budgetItems = response.data.budgetItems

    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        if (error.text) {
          dispatch(addBudgetItemsError(error.text))
        } else {
          dispatch(addBudgetItemsError('Error communicating with API'))
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
          dispatch(addBudgetItemsError('Budget item does not have valid id to use as option value'))
          errored = true
        }

        if (typeof option.name !== 'string') {
          dispatch(addBudgetItemsError(`Budget item (id: ${option.name}) does not have valid name to use as option label`))
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

module.exports = {
  updateBudgetItems,
  updateBudgetItemFilterOptions
}
