const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const SET_EXPLORE_DISPLAY = 'georgianBudget/explore/SET_EXPLORE_DISPLAY'
const SET_SELECTED_IDS = 'georgianBudget/explore/SET_SELECTED_IDS'
const MARK_LIST_LOADED = 'georgianBudget/explore/MARK_LIST_LOADED'
const SET_PARENT_ITEM_ID = 'georgianBudget/explore/SET_PARENT_ITEM_ID'

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
    case MARK_LIST_LOADED:
      return Object.assign(
        {},
        state,
        {
          listLoaded: state.listLoaded.concat(action.listLoaded)
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

reducer.setParentBudgetItemId = id => ({
  type: SET_PARENT_ITEM_ID,
  id: id
})

reducer.markListLoaded = (listLoaded) => ({
  type: MARK_LIST_LOADED,
  listLoaded: listLoaded
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

reducer.getExploreListLoaded = createSelector(
  reducer.getExploreState,
  ({listLoaded}) => listLoaded
)

module.exports = reducer
