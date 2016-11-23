const { normalize, Schema, arrayOf } = require('normalizr')
const { beginLoadingExploreDetails, finishLoadingExploreDetails } = require('../ducks/explore/details')

const { addError } = require('../ducks/errors')

const { mergeBudgetItems } = require('../ducks/budgetItems')

const { getLocale } = require('js/redux/ducks/locale')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

const { markBudgetItemDetailsLoaded } = require('js/redux/ducks/budgetItems')

const fetchBudgetItemDetails = (itemId) => (dispatch, getState) => {
  const state = getState()
  const locale = getLocale(state)
  const financeType = state.filters.financeType.value
  const timePeriodType = state.filters.timePeriodType.value

  const requiredState = [
    locale,
    financeType,
    timePeriodType
  ]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  dispatch(beginLoadingExploreDetails())

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      filters: {
        financeType: financeType,
        timePeriodType: timePeriodType
      },
      budgetItemIds: [itemId]
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

    const budgetItem = new Schema('budgetItems', { defaults: { loaded: [] } })

    const normalized = normalize(response.data, {
      budgetItems: arrayOf(budgetItem)
    })

    const budgetItems = normalized.entities.budgetItems
    dispatch(markBudgetItemDetailsLoaded(itemId))

    dispatch(mergeBudgetItems(budgetItems))
  })
}

module.exports = fetchBudgetItemDetails
