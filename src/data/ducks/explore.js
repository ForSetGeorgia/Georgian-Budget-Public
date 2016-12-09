const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const { getBudgetItem } = require('src/data/modules/entities/budgetItem')

const SET_EXPLORE_DISPLAY = 'georgianBudget/explore/SET_EXPLORE_DISPLAY'
const SET_DETAILS_ITEM_ID = 'georgianBudget/explore/SET_DETAILS_ITEM_ID'
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
    case SET_DETAILS_ITEM_ID:
      return Object.assign(
        {},
        state,
        {
          detailsItemId: action.id
        }
      )
    case SET_PARENT_ITEM_ID:
      return Object.assign(
        {},
        state,
        {
          parentItemId: action.id
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

reducer.switchDisplayToDetails = () => reducer.setExploreDisplay('details')
reducer.switchDisplayToList = () => reducer.setExploreDisplay('list')

reducer.setDetailsItemId = id => ({
  type: SET_DETAILS_ITEM_ID,
  id: id
})

reducer.setParentItemId = id => ({
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

reducer.getDetailsItemId = createSelector(
  reducer.getExploreState,
  ({detailsItemId}) => detailsItemId
)

reducer.getDetailsItem = state => (
  getBudgetItem(state, reducer.getDetailsItemId(state))
)

reducer.getParentItemId = createSelector(
  reducer.getExploreState,
  ({parentItemId}) => parentItemId
)

reducer.getExploreListLoaded = createSelector(
  reducer.getExploreState,
  ({listLoaded}) => listLoaded
)

module.exports = reducer
