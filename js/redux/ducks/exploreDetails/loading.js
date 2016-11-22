const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const BEGIN_LOADING_DATA = 'georgianBudget/budgetItems/loading/BEGIN_LOADING_DATA'
const FINISH_LOADING_DATA = 'georgianBudget/budgetItems/loading/FINISH_LOADING_DATA'

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

reducer.beginLoadingBudgetItems = () => ({
  type: BEGIN_LOADING_DATA
})

reducer.finishLoadingBudgetItems = () => ({
  type: FINISH_LOADING_DATA
})

reducer.getBudgetItemsLoading = createSelector(
  rootSelector,
  ({loading}) => loading
)

module.exports = reducer
