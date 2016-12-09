const { normalize, arrayOf } = require('normalizr')
const budgetItemSchemaForLocale = require('src/data/schemas/budgetItemForLocale')

const { markListLoaded } = require('src/data/ducks/explore')
const { mergeSpentFinances } = require('src/data/ducks/spentFinances')
const { mergePlannedFinances } = require('src/data/ducks/plannedFinances')
const { mergeBudgetItems } = require('src/data/ducks/budgetItems')
const { getLocale } = require('src/data/ducks/locale')
const { addError } = require('src/data/ducks/errors')

const camelToSnake = require('src/utilities/camelToSnake')

const { getSelectedBudgetItemType } = require('src/data/ducks/filters')

const georgianBudgetAPI = require('src/services/georgianBudgetAPI')

const fetchListedBudgetItems = () => (dispatch, getState) => {
  const state = getState()

  const locale = getLocale(state)
  const budgetItemType = getSelectedBudgetItemType(state)

  const requiredState = [locale, budgetItemType]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      budgetItemFields: 'id,name,type,spent_finances,planned_finances',
      filters: {
        budgetItemType: camelToSnake(budgetItemType),
        timePeriodType: 'year'
      }
    }
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
