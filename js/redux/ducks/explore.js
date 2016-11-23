const { combineReducers } = require('redux')
const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const SET_SELECTED_BUDGET_ITEM_IDS =
'georgianBudget/explore/SET_SELECTED_BUDGET_ITEM_IDS'

const selectedIdsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SELECTED_BUDGET_ITEM_IDS:
      return action.ids
    default:
      return state
  }
}

const reducer = combineReducers({
  selectedIds: selectedIdsReducer,
  details: require('./explore/details'),
  list: require('./explore/list')
})

reducer.setSelectedBudgetItemIds = function (ids) {
  return {
    type: SET_SELECTED_BUDGET_ITEM_IDS,
    ids: ids
  }
}

reducer.getExploreState = createSelector(
  rootSelector,
  ({explore}) => explore
)

reducer.getSelectedBudgetItemIds = createSelector(
  reducer.getExploreState,
  ({selectedIds}) => selectedIds
)

reducer.getSelectedBudgetItems = (state) => {
  const selectedIds = reducer.getSelectedBudgetItemIds(state)
  const selectedItems = {}

  Object.keys(state.budgetItems).forEach((id) => {
    if (selectedIds.includes(id)) selectedItems[id] = state.budgetItems[id]
  })

  return selectedItems
}

module.exports = reducer
