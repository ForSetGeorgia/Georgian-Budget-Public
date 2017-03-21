const axios = require('axios')
const { normalize, arrayOf } = require('normalizr')
const budgetItemSchemaForLocale = require('src/data/schemas/budgetItemForLocale')

const { markListLoaded } = require('src/data/ducks/explore')
const { mergeSpentFinances } = require('src/data/ducks/spentFinances')
const { mergePlannedFinances } = require('src/data/ducks/plannedFinances')
const { mergeBudgetItems } = require('src/data/ducks/budgetItems')
const { getLocale } = require('src/data/ducks/locale')
const { addError } = require('src/data/ducks/errors')

const { getSelectedBudgetItemType } = require('src/data/ducks/filters')

const fetchListedBudgetItems = () => (dispatch, getState) => {
  const state = getState()
  const locale = getLocale(state)
  const budgetItemType = getSelectedBudgetItemType(state)

  const requiredState = [locale, budgetItemType]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  const getBudgetItemsPathForAPI = budgetItemType => {
    switch (budgetItemType) {
      case 'program': return 'programs'
      case 'spendingAgency': return 'spending_agencies'
      case 'priority': return 'priorities'
      default: return ''
    }
  }

  axios.get(
    `${process.env.API_URL}/${locale}/v1/${getBudgetItemsPathForAPI(budgetItemType)}`,
    {
      params: {
        budgetItemFields: 'id,name,type,spentFinances,plannedFinances',
        timePeriodType: 'year'
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
      budgetItems: arrayOf(budgetItemSchemaForLocale(locale))
    })

    const { budgetItems, spentFinances, plannedFinances } = normalized.entities

    dispatch(mergeSpentFinances(spentFinances))
    dispatch(mergePlannedFinances(plannedFinances))
    dispatch(mergeBudgetItems(budgetItems))
    dispatch(markListLoaded(`${budgetItemType}_${locale}`))
  })
}

module.exports = fetchListedBudgetItems
