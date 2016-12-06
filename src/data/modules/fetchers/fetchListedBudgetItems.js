const { normalize, arrayOf } = require('normalizr')
const budgetItemSchemaForLocale = require('src/data/schemas/budgetItem')

const { markListLoaded } = require('src/data/ducks/explore')
const { mergeBudgetItems } = require('src/data/ducks/budgetItems')
const { getLocale } = require('src/data/ducks/locale')
const { addError } = require('src/data/ducks/errors')

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
      budgetItemFields: 'id,name,type',

      filters: {
        budgetItemType: budgetItemType
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

    const { budgetItems } = normalized.entities

    dispatch(mergeBudgetItems(budgetItems))
    dispatch(markListLoaded(`${budgetItemType}_${locale}`))
  })
}

module.exports = fetchListedBudgetItems
