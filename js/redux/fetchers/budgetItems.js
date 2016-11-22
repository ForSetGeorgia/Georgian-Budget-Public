const { beginLoadingBudgetItems, finishLoadingBudgetItems } = require('../ducks/budgetItems/loading')

const { addError, clearErrors } = require('../ducks/errors')

const { setBudgetItems } = require('../ducks/budgetItems/data')

const { getLocale } = require('js/redux/ducks/locale')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

const fetchBudgetItems = () => (dispatch, getState) => {
  const state = getState()
  const locale = getLocale(state)
  const financeType = state.filters.financeType.value
  const budgetItemIds = state.filters.budgetItems.selectedIds
  const timePeriodType = state.filters.timePeriodType.value

  if (budgetItemIds.length === 0) {
    dispatch(setBudgetItems([]))
    return
  }

  const requiredState = [
    locale,
    financeType,
    timePeriodType,
    budgetItemIds
  ]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  dispatch(clearErrors())
  dispatch(beginLoadingBudgetItems())

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      filters: {
        financeType: financeType,
        timePeriodType: timePeriodType
      },
      budgetItemIds: budgetItemIds
    }
  }).then((response) => {
    dispatch(finishLoadingBudgetItems())

    if (!response || !response.data || typeof response.data !== 'object') {
      dispatch(addError('Error communicating with API'))
      return
    }

    const { errors, budgetItems } = response.data

    errors.forEach((error) => {
      dispatch(addError(error.text))
    })

    dispatch(setBudgetItems(budgetItems))
  })
}

module.exports = fetchBudgetItems
