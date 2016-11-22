const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const START_LOADING_BUDGET_ITEM_FILTER =
'georgianBudget/filters/budgetItems/START_LOADING_BUDGET_ITEM_FILTER'

const FINISH_LOADING_BUDGET_ITEM_FILTER =
'georgianBudget/filters/budgetItems/FINISH_LOADING_BUDGET_ITEM_FILTER'

const SET_SELECTED_BUDGET_ITEM_IDS =
'georgianBudget/filters/budgetItems/SET_SELECTED_BUDGET_ITEM_IDS'

const SET_BUDGET_ITEM_FILTER_OPTIONS =
'georgianBudget/filters/budgetItems/SET_BUDGET_ITEM_FILTER_OPTIONS'

const SET_BUDGET_ITEMS_FILTER_VISIBILITY =
'georgianBudget/filters/budgetItems/SET_BUDGET_ITEMS_FILTER_VISIBILITY'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case START_LOADING_BUDGET_ITEM_FILTER:
      return Object.assign(
        {},
        state,
        {
          loading: true
        }
      )
    case FINISH_LOADING_BUDGET_ITEM_FILTER:
      return Object.assign(
        {},
        state,
        {
          loading: false
        }
      )
    case SET_SELECTED_BUDGET_ITEM_IDS:
      return Object.assign(
        {},
        state,
        {
          selectedIds: action.ids
        }
      )
    case SET_BUDGET_ITEM_FILTER_OPTIONS:
      return Object.assign(
        {},
        state,
        {
          options: action.options
        }
      )
    case SET_BUDGET_ITEMS_FILTER_VISIBILITY:
      return Object.assign(
        {},
        state,
        {
          visible: action.value
        }
      )
    default:
      return state
  }
}

reducer.startLoadingBudgetItemFilter = () => ({
  type: START_LOADING_BUDGET_ITEM_FILTER
})

reducer.finishLoadingBudgetItemFilter = () => ({
  type: FINISH_LOADING_BUDGET_ITEM_FILTER
})

reducer.setSelectedBudgetItemIds = function (ids) {
  return {
    type: SET_SELECTED_BUDGET_ITEM_IDS,
    ids: ids
  }
}

reducer.setBudgetItemFilterOptions = (options) => {
  return {
    type: SET_BUDGET_ITEM_FILTER_OPTIONS,
    options: options
  }
}

reducer.setBudgetItemsFilterVisibility = (isVisible) => {
  return {
    type: SET_BUDGET_ITEMS_FILTER_VISIBILITY,
    value: isVisible
  }
}

// Selectors
reducer.getBudgetItemsFilter = createSelector(
  rootSelector,
  ({budgetItems}) => budgetItems
)

reducer.getBudgetItemsFilterLoading = createSelector(
  reducer.getBudgetItemsFilter,
  ({loading}) => loading
)

reducer.getSelectedBudgetItemIds = createSelector(
  reducer.getBudgetItemsFilter,
  ({selectedIds}) => selectedIds
)

module.exports = reducer
