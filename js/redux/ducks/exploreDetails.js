const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const BEGIN_LOADING_DATA = 'georgianBudget/exploreDetails/loading/BEGIN_LOADING_DATA'
const FINISH_LOADING_DATA = 'georgianBudget/exploreDetails/loading/FINISH_LOADING_DATA'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case BEGIN_LOADING_DATA:
      return Object.assign(
        {},
        state,
        {
          loading: true
        }
      )
    case FINISH_LOADING_DATA:
      return Object.assign(
        {},
        state,
        {
          loading: false
        }
      )
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

reducer.getExploreDetails = createSelector(
  rootSelector,
  ({exploreDetails}) => exploreDetails
)

reducer.getExploreDetailsLoading = createSelector(
  reducer.getExploreDetails,
  ({loading}) => loading
)

module.exports = reducer
