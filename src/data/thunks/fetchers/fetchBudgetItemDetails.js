const axios = require('axios')
const { normalize } = require('normalizr')
const budgetItemSchemaForLocale = require('src/data/schemas/budgetItemForLocale')

const { addError } = require('src/data/ducks/errors')

const { mergeBudgetItems } = require('src/data/ducks/budgetItems')
const { mergeSpentFinances } = require('src/data/ducks/spentFinances')
const { mergePlannedFinances } = require('src/data/ducks/plannedFinances')

const { getLocale } = require('src/data/ducks/locale')

const fetchBudgetItemDetails = (itemId) => (dispatch, getState) => {
  const state = getState()
  const locale = getLocale(state)

  const requiredState = [
    locale
  ]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  axios.get(
    `${process.env.API_URL}/${locale}/v1/budget_items/${itemId}`,
    {
      params: {
        budgetItemFields: 'id,type,code,name,spentFinances,plannedFinances,related_budget_items'
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Key-Inflection': 'camel'
      }
    }
  ).catch((error) => {
    dispatch(addError(`Error communicating with API: ${error}`))
  }).then((response) => {
    if (!response || !response.data || typeof response.data !== 'object') return

    response.data.errors.forEach((error) => {
      dispatch(addError(error.text))
    })

    const normalized = normalize(response.data, {
      budgetItem: budgetItemSchemaForLocale(locale)
    })

    const { budgetItems, spentFinances, plannedFinances } = normalized.entities

    if (spentFinances) dispatch(mergeSpentFinances(spentFinances))
    if (plannedFinances) dispatch(mergePlannedFinances(plannedFinances))

    if (budgetItems) {
      if (budgetItems[itemId]) {
        budgetItems[itemId].loaded = budgetItems[itemId].loaded.concat(`details_${locale}`)
      }

      dispatch(mergeBudgetItems(budgetItems))
    }
  })
}

module.exports = fetchBudgetItemDetails
