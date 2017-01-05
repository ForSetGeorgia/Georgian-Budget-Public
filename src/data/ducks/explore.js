const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const { getBudgetItem } = require('src/data/modules/entities/budgetItem')

const SET_DETAILS_ITEM_ID = 'georgianBudget/explore/SET_DETAILS_ITEM_ID'
const MARK_LIST_LOADED = 'georgianBudget/explore/MARK_LIST_LOADED'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_DETAILS_ITEM_ID:
      return Object.assign(
        {},
        state,
        {
          detailsItemId: action.id
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

reducer.setDetailsItemId = id => ({
  type: SET_DETAILS_ITEM_ID,
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

reducer.getDetailsItemId = createSelector(
  reducer.getExploreState,
  ({detailsItemId}) => detailsItemId
)

reducer.getDetailsItem = state => (
  getBudgetItem(state, reducer.getDetailsItemId(state))
)

reducer.getExploreListLoaded = createSelector(
  reducer.getExploreState,
  ({listLoaded}) => listLoaded
)

module.exports = reducer
