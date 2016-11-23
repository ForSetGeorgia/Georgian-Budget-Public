const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const { getBudgetItemsData } = require('js/redux/ducks/budgetItems')

const SET_LISTED_ITEM_IDS = 'georgianBudget/explore/list/SET_LISTED_ITEM_IDS'

const reducer = (state = {}, action) => {
  switch (action.type) {
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

reducer.setListedItemIds = (ids) => ({
  type: SET_LISTED_ITEM_IDS,
  ids: ids
})

reducer.getExploreListState = createSelector(
  rootSelector,
  ({list}) => list
)

reducer.getListedItemIds = createSelector(
  reducer.getExploreListState,
  ({listedItemIds}) => listedItemIds
)

reducer.getListedItems = state => (
  reducer.getListedItemIds(state)
  .map(id => getBudgetItemsData(state)[id])
  .filter(budgetItem => budgetItem)
)

module.exports = reducer
