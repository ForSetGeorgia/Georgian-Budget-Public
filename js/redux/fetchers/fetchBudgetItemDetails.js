const { normalize, arrayOf } = require('normalizr')
const budgetItem = require('js/redux/schemas/budgetItem')

const { addError } = require('../ducks/errors')

const { mergeBudgetItems } = require('../ducks/budgetItems')
const { mergeSpentFinances } = require('js/redux/ducks/spentFinances')
const { mergePlannedFinances } = require('js/redux/ducks/plannedFinances')

const { getLocale } = require('js/redux/ducks/locale')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

const { markBudgetItemDetailsLoaded } = require('js/redux/ducks/budgetItems')

const fetchBudgetItemDetails = (itemId) => (dispatch, getState) => {
  const state = getState()
  const locale = getLocale(state)

  const requiredState = [
    locale
  ]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      budgetItemFields: 'id,code,name,spent_finances,planned_finances',
      budgetItemIds: [itemId]
    }
  }).then((response) => {
    if (!response || !response.data || typeof response.data !== 'object') return

    response.data.errors.forEach((error) => {
      dispatch(addError(error.text))
    })

    const normalized = normalize(response.data, {
      budgetItems: arrayOf(budgetItem)
    })

    const { budgetItems, spentFinances, plannedFinances } = normalized.entities

    dispatch(mergeBudgetItems(budgetItems))
    dispatch(mergeSpentFinances(spentFinances))
    dispatch(mergePlannedFinances(plannedFinances))
    dispatch(markBudgetItemDetailsLoaded(itemId))
  })
}

module.exports = fetchBudgetItemDetails
