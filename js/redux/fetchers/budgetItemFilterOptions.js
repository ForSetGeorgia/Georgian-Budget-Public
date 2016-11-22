const { normalize, Schema, arrayOf } = require('normalizr')

const {
  startLoadingBudgetItemFilter,
  finishLoadingBudgetItemFilter,
  setSelectedBudgetItemIds,
  setBudgetItemFilterOptions
} = require('../ducks/filters/budgetItems')

const { mergeBudgetItems } = require('js/redux/ducks/budgetItems')

const { getLocale } = require('js/redux/ducks/locale')

const fetchBudgetItems = require('./budgetItems')

const { addError } = require('../ducks/errors')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

const fetchBudgetItemFilterOptions = () => (dispatch, getState) => {
  const state = getState()

  const locale = getLocale(state)
  const budgetItemType = state.filters.budgetItemType.value

  const requiredState = [locale, budgetItemType]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }
  dispatch(setBudgetItemFilterOptions([]))
  dispatch(startLoadingBudgetItemFilter())

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      budgetItemFields: 'id,name',

      filters: {
        budgetItemType: budgetItemType
      }
    }
  }).then((response) => {
    dispatch(finishLoadingBudgetItemFilter())

    if (!response || !response.data || typeof response.data !== 'object') {
      dispatch(addError('Error communicating with API'))
      return
    }

    const { errors = [], budgetItems: budgetItemsArray = [] } = response.data

    errors.forEach((error) => {
      dispatch(addError(error.text))
    })

    dispatch(setBudgetItemFilterOptions(budgetItemsArray))

    const budgetItem = new Schema('budgetItems')

    const normalized = normalize(response.data, {
      budgetItems: arrayOf(budgetItem)
    })

    const budgetItems = normalized.entities.budgetItems

    dispatch(mergeBudgetItems(budgetItems))

    if (budgetItemType === 'total' && budgetItems.length > 0) {
      dispatch(setSelectedBudgetItemIds([budgetItems[0].id]))
      dispatch(fetchBudgetItems())
    }
  })
}

module.exports = fetchBudgetItemFilterOptions
