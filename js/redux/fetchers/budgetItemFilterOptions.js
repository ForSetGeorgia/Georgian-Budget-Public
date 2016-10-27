const {
  startLoadingBudgetItemFilter,
  finishLoadingBudgetItemFilter,
  setSelectedBudgetItemIds,
  setBudgetItemFilterOptions
} = require('../ducks/filters/budgetItems')

const fetchBudgetItems = require('./budgetItems')

const { addBudgetItemsError } = require('../ducks/budgetItems/errors')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

const fetchBudgetItemFilterOptions = () => (dispatch, getState) => {
  const state = getState()

  const locale = state.locale
  const budgetItemType = state.filters.budgetItemType.value

  const requiredState = [locale, budgetItemType]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }
  dispatch(setBudgetItemFilterOptions([]))
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

    dispatch(setBudgetItemFilterOptions(budgetItems))

    if (budgetItemType === 'total' && budgetItems.length > 0) {
      dispatch(setSelectedBudgetItemIds([budgetItems[0].id]))
      dispatch(fetchBudgetItems())
    }
  })
}

module.exports = fetchBudgetItemFilterOptions
