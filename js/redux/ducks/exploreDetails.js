const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const BEGIN_LOADING = 'georgianBudget/exploreDetails/BEGIN_LOADING'
const FINISH_LOADING = 'georgianBudget/exploreDetails/FINISH_LOADING'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case BEGIN_LOADING:
      return Object.assign(
        {},
        state,
        {
          loading: true
        }
      )
    case FINISH_LOADING:
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
  type: BEGIN_LOADING
})

reducer.finishLoadingExploreDetails = () => ({
  type: FINISH_LOADING
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
