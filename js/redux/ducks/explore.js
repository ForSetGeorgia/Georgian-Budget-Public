const { combineReducers } = require('redux')
const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const SET_SELECTED_BUDGET_ITEM_IDS =
'georgianBudget/filters/budgetItems/SET_SELECTED_BUDGET_ITEM_IDS'

const selectedIdsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SELECTED_BUDGET_ITEM_IDS:
      return Object.assign(
        [],
        state,
        action.ids
      )
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

reducer.getSelectedBudgetItems = (state) => (
  reducer.getSelectedBudgetItemIds(state)
  .map(id => state.budgetItems[id])
  .filter(budgetItem => budgetItem)
)

module.exports = reducer
