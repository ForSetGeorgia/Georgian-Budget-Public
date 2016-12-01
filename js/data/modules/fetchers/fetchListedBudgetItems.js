const { normalize, arrayOf } = require('normalizr')
const budgetItem = require('js/data/schemas/budgetItem')

const { markListLoaded } = require('js/data/ducks/explore')
const { mergeBudgetItems } = require('js/data/ducks/budgetItems')
const { getLocale } = require('js/data/ducks/locale')
const { addError } = require('js/data/ducks/errors')

const { getSelectedBudgetItemType } = require('js/data/ducks/filters')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

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
      budgetItems: arrayOf(budgetItem)
    })

    const { budgetItems } = normalized.entities

    dispatch(mergeBudgetItems(budgetItems))
    dispatch(markListLoaded(budgetItemType))
  })
}

module.exports = fetchListedBudgetItems
