const axios = require('axios')

const { addError, clearErrors } = require('js/ducks/data/errors')

const {
  startLoadingBudgetItemFilter,
  finishLoadingBudgetItemFilter,
  setSelectedBudgetItemIds,
  setBudgetItemFilterOptions
} = require('js/ducks/filters/budgetItems')

const { beginLoadingData, finishLoadingData } = require('js/ducks/data/loading')
const { setBudgetItems } = require('js/ducks/data/budgetItems')

const updateBudgetItems = () => (dispatch, getState) => {
  const state = getState()
  const locale = state.locale
  const budgetItemType = state.filters.budgetItemType.value
  const financeType = state.filters.financeType.value
  const budgetItems = state.filters.budgetItems.selectedIds

  if (state.filters.budgetItems.selectedIds.length === 0) {
    dispatch(setBudgetItems([]))
    return
  }

  const requiredState = [locale, budgetItemType, financeType, budgetItems]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  dispatch(beginLoadingData())

  axios.get(
    `${process.env.API_URL}/${locale}/v1`,
    {
      params: {
        filters: {
          budgetItemType: budgetItemType,
          financeType: financeType
        },
        budgetItemIds: budgetItems
      }
    }
  ).catch((error) => {
    dispatch(addError(`Error communicating with API: ${error}`))
  }).then((response) => {
    if (typeof response.data !== 'object') {
      dispatch(addError('Error communicating with API'))
      return
    }

    const errors = response.data.errors
    const budgetItems = response.data.budgetItems

    if (errors.length === 0) {
      dispatch(clearErrors())
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        dispatch(addError(error.text))
      })
    }

    if (budgetItems) {
      dispatch(setBudgetItems(budgetItems))
    }

    dispatch(finishLoadingData())
  })
}

const updateBudgetItemFilterOptions = () => (dispatch, getState) => {
  const state = getState()

  const locale = state.locale
  const budgetItemType = state.filters.budgetItemType.value

  const requiredState = [locale, budgetItemType]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  dispatch(startLoadingBudgetItemFilter())
  axios.get(
    `${process.env.API_URL}/${locale}/v1`,
    {
      params: {
        budgetItemFields: 'id,name',

        filters: {
          budgetItemType: budgetItemType
        }
      }
    }
  ).catch((error) => {
    dispatch(addError(`Error communicating with API: ${error}`))
  }).then((response) => {
    if (!response || !response.data || typeof response.data !== 'object') {
      dispatch(addError('Error communicating with API'))
      return
    }

    const errors = response.data.errors
    const budgetItems = response.data.budgetItems

    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        if (error.text) {
          dispatch(addError(error.text))
        } else {
          dispatch(addError('Error communicating with API'))
        }
      })
    }

    if (budgetItems) {
      const budgetItemFilterOptions = budgetItems.map((budgetItem) => {
        const option = {
          id: budgetItem.id,
          name: budgetItem.name
        }

        let errored = false

        if (typeof option.id !== 'number') {
          dispatch(addError('Budget item does not have valid id to use as option value'))
          errored = true
        }

        if (typeof option.name !== 'string') {
          dispatch(addError(`Budget item (id: ${option.name}) does not have valid name to use as option label`))
          errored = true
        }

        if (errored) return null

        return option
      }).filter((option) => option !== null && option !== undefined)

      dispatch(setBudgetItemFilterOptions(budgetItemFilterOptions))

      if (budgetItemType === 'total' && budgetItemFilterOptions.length > 0) {
        dispatch(setSelectedBudgetItemIds([budgetItemFilterOptions[0].id]))
        dispatch(updateBudgetItems())
      }

      dispatch(finishLoadingBudgetItemFilter())
    }
  })
}

module.exports = {
  setBudgetItems,
  updateBudgetItems,
  updateBudgetItemFilterOptions
}
