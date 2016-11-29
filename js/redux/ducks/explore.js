const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const { getBudgetItemsData } = require('js/redux/ducks/budgetItems')

const SET_EXPLORE_DISPLAY = 'georgianBudget/explore/SET_EXPLORE_DISPLAY'
const SET_SELECTED_IDS = 'georgianBudget/explore/SET_SELECTED_IDS'
const SET_LISTED_ITEM_IDS = 'georgianBudget/explore/list/SET_LISTED_ITEM_IDS'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_EXPLORE_DISPLAY:
      return Object.assign(
        {},
        state,
        {
          display: action.display
        }
      )
    case SET_SELECTED_IDS:
      return Object.assign(
        {},
        state,
        {
          selectedIds: action.ids
        }
      )
    case SET_LISTED_ITEM_IDS:
      return Object.assign(
        {},
        state,
        {
          listedItemIds: action.ids
        }
      )
    default:
      return state
  }
}

reducer.setExploreDisplay = newDisplay => ({
  type: SET_EXPLORE_DISPLAY,
  display: newDisplay
})

reducer.setSelectedBudgetItemIds = function (ids) {
  return {
    type: SET_SELECTED_IDS,
    ids: ids
  }
}

reducer.setListedItemIds = (ids) => ({
  type: SET_LISTED_ITEM_IDS,
  ids: ids
})

reducer.getExploreState = createSelector(
  rootSelector,
  ({explore}) => explore
)

reducer.getSelectedExploreDisplay = createSelector(
  reducer.getExploreState,
  ({display}) => display
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

reducer.getListedItemIds = createSelector(
  reducer.getExploreState,
  ({listedItemIds}) => listedItemIds
)

reducer.getListedItems = state => (
  reducer.getListedItemIds(state)
  .map(id => getBudgetItemsData(state)[id])
  .filter(budgetItem => budgetItem)
)

module.exports = reducer
