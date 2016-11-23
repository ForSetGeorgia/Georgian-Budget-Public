const { normalize, arrayOf } = require('normalizr')
const budgetItem = require('js/redux/schemas/budgetItem')

const { setListedItemIds } = require('js/redux/ducks/explore/list')
const { mergeBudgetItems } = require('js/redux/ducks/budgetItems')
const { getLocale } = require('js/redux/ducks/locale')
const { addError } = require('js/redux/ducks/errors')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

const fetchBudgetItemFilterOptions = () => (dispatch, getState) => {
  const state = getState()

  const locale = getLocale(state)
  const budgetItemType = state.filters.budgetItemType.value

  const requiredState = [locale, budgetItemType]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      budgetItemFields: 'id,name',

      filters: {
        budgetItemType: budgetItemType
      }
    }
  }).then((response) => {

    if (!response || !response.data || typeof response.data !== 'object') {
      dispatch(addError('Error communicating with API'))
      return
    }

    const { errors = [] } = response.data

    errors.forEach((error) => {
      dispatch(addError(error.text))
    })

    const normalized = normalize(response.data, {
      budgetItems: arrayOf(budgetItem)
    })

    const { budgetItems } = normalized.entities

    dispatch(mergeBudgetItems(budgetItems))
    dispatch(setListedItemIds(Object.keys(budgetItems)))
  })
}

module.exports = fetchBudgetItemFilterOptions
