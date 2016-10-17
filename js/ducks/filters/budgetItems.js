const START_LOADING_BUDGET_ITEM_FILTER =
'georgianBudget/filters/budgetItems/START_LOADING_BUDGET_ITEM_FILTER'

const FINISH_LOADING_BUDGET_ITEM_FILTER =
'georgianBudget/filters/budgetItems/FINISH_LOADING_BUDGET_ITEM_FILTER'

const SET_SELECTED_BUDGET_ITEM_IDS =
'georgianBudget/filters/budgetItems/SET_SELECTED_BUDGET_ITEM_IDS'

const SET_BUDGET_ITEM_FILTER_OPTIONS =
'georgianBudget/filters/budgetItems/SET_BUDGET_ITEM_FILTER_OPTIONS'

const HIDE_BUDGET_ITEMS_FILTER =
'georgianBudget/filters/budgetItems/HIDE_BUDGET_ITEMS_FILTER'

const SHOW_BUDGET_ITEMS_FILTER =
'georgianBudget/filters/budgetItems/SHOW_BUDGET_ITEMS_FILTER'

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
    case HIDE_BUDGET_ITEMS_FILTER:
      return Object.assign(
        {},
        state,
        {
          hidden: true
        }
      )
    case SHOW_BUDGET_ITEMS_FILTER:
      return Object.assign(
        {},
        state,
        {
          hidden: false
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

reducer.hideBudgetItemsFilter = (options) => {
  return {
    type: HIDE_BUDGET_ITEMS_FILTER
  }
}

reducer.showBudgetItemsFilter = (options) => {
  return {
    type: SHOW_BUDGET_ITEMS_FILTER
  }
}

module.exports = reducer
