const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const BEGIN_LOADING_DATA = 'georgianBudget/exploreDetails/loading/BEGIN_LOADING_DATA'
const FINISH_LOADING_DATA = 'georgianBudget/exploreDetails/loading/FINISH_LOADING_DATA'

const reducer = (state = false, action) => {
  switch (action.type) {
    case BEGIN_LOADING_DATA:
      return true
    case FINISH_LOADING_DATA:
      return false
    default:
      return state
  }
}

reducer.beginLoadingExploreDetails = () => ({
  type: BEGIN_LOADING_DATA
})

reducer.finishLoadingExploreDetails = () => ({
  type: FINISH_LOADING_DATA
})

reducer.getExploreDetailsLoading = createSelector(
  rootSelector,
  ({loading}) => loading
)

module.exports = reducer
