const { normalize, Schema, arrayOf } = require('normalizr')
const { beginLoadingExploreDetails, finishLoadingExploreDetails } = require('../ducks/explore/details')

const { addError, clearErrors } = require('../ducks/errors')

const { mergeBudgetItems } = require('../ducks/budgetItems')
const { getSelectedBudgetItemIds } = require('js/redux/ducks/explore')

const { getLocale } = require('js/redux/ducks/locale')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

const fetchBudgetItems = () => (dispatch, getState) => {
  const state = getState()
  const locale = getLocale(state)
  const financeType = state.filters.financeType.value
  const budgetItemIds = getSelectedBudgetItemIds(state)
  const timePeriodType = state.filters.timePeriodType.value

  if (budgetItemIds.length === 0) {
    dispatch(mergeBudgetItems({}))
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
  dispatch(beginLoadingExploreDetails())

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      filters: {
        financeType: financeType,
        timePeriodType: timePeriodType
      },
      budgetItemIds: budgetItemIds
    }
  }).then((response) => {
    dispatch(finishLoadingExploreDetails())

    if (!response || !response.data || typeof response.data !== 'object') {
      dispatch(addError('Error communicating with API'))
      return
    }

    const { errors } = response.data

    errors.forEach((error) => {
      dispatch(addError(error.text))
    })

    const budgetItemsSchema = new Schema('budgetItems')

    const normalized = normalize(response.data, {
      budgetItems: arrayOf(budgetItemsSchema)
    })

    const budgetItems = normalized.entities.budgetItems

    dispatch(mergeBudgetItems(budgetItems))
  })
}

module.exports = fetchBudgetItems
