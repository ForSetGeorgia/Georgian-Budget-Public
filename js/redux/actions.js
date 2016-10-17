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

  dispatch(clearBudgetItemsErrors())
  dispatch(beginLoadingBudgetItems())

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      filters: {
        budgetItemType: budgetItemType,
        financeType: financeType
      },
      budgetItemIds: budgetItemIds
    }
  }).then((response) => {
    dispatch(finishLoadingBudgetItems())

    if (!response || !response.data || typeof response.data !== 'object') {
      dispatch(addBudgetItemsError('Error communicating with API'))
      return
    }

    const { errors, budgetItems } = response.data

    errors.forEach((error) => {
      dispatch(addBudgetItemsError(error.text))
    })

    dispatch(setBudgetItems(budgetItems))
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
  }).then((response) => {
    dispatch(finishLoadingBudgetItemFilter())

    if (!response || !response.data || typeof response.data !== 'object') {
      dispatch(addBudgetItemsError('Error communicating with API'))
      return
    }

    const { errors = [], budgetItems = [] } = response.data

    errors.forEach((error) => {
      dispatch(addBudgetItemsError(error.text))
    })

    if (!budgetItems) return

    dispatch(setBudgetItemFilterOptions(budgetItems))

    if (budgetItemType === 'total' && budgetItems.length > 0) {
      dispatch(setSelectedBudgetItemIds([budgetItems[0].id]))
      dispatch(updateBudgetItems())
    }

  })
}

module.exports = {
  updateBudgetItems,
  updateBudgetItemFilterOptions
}
