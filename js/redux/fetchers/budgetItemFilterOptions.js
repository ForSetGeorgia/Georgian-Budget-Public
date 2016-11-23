const { normalize, arrayOf } = require('normalizr')
const budgetItem = require('js/redux/schemas/budgetItem')

const {
  startLoadingBudgetItemFilter,
  finishLoadingBudgetItemFilter,
  setSelectedBudgetItemIds,
  setBudgetItemFilterOptions
} = require('js/redux/ducks/filters/budgetItems')

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

    const normalized = normalize(response.data, {
      budgetItems: arrayOf(budgetItem)
    })

    const { budgetItems } = normalized.entities

    dispatch(mergeBudgetItems(budgetItems))
    dispatch(setListedItemIds(Object.keys(budgetItems)))

    if (budgetItemType === 'total' && budgetItems.length > 0) {
      dispatch(setSelectedBudgetItemIds([budgetItems[0].id]))
    }
  })
}

module.exports = fetchBudgetItemFilterOptions
