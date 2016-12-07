const { normalize } = require('normalizr')
const budgetItemSchemaForLocale = require('src/data/schemas/budgetItemForLocale')

const { addError } = require('src/data/ducks/errors')

const { mergeBudgetItems } = require('src/data/ducks/budgetItems')
const { mergeSpentFinances } = require('src/data/ducks/spentFinances')
const { mergePlannedFinances } = require('src/data/ducks/plannedFinances')

const { getLocale } = require('src/data/ducks/locale')

const georgianBudgetAPI = require('src/services/georgianBudgetAPI')

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
      budgetItemId: itemId
    }
  }).then((response) => {
    if (!response || !response.data || typeof response.data !== 'object') return

    response.data.errors.forEach((error) => {
      dispatch(addError(error.text))
    })

    const normalized = normalize(response.data, {
      budgetItem: budgetItemSchemaForLocale(locale)
    })

    const { budgetItems, spentFinances, plannedFinances } = normalized.entities

    dispatch(mergeSpentFinances(spentFinances))
    dispatch(mergePlannedFinances(plannedFinances))

    Object.keys(budgetItems).forEach(budgetItemId => {
      budgetItems[budgetItemId].loaded = budgetItems[budgetItemId].loaded.concat(`details_${locale}`)
    })

    dispatch(mergeBudgetItems(budgetItems))
  })
}

module.exports = fetchBudgetItemDetails
