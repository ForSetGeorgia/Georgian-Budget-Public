const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const deepMergeEntities = require('src/deepMergeEntities')

const MERGE_BUDGET_ITEMS = 'georgianBudget/budgetItems/MERGE_BUDGET_ITEMS'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case MERGE_BUDGET_ITEMS:
      return deepMergeEntities(state, action.data)
    default: {
      return state
    }
  }
}

reducer.mergeBudgetItems = function (budgetItems) {
  return {
    type: MERGE_BUDGET_ITEMS,
    data: budgetItems
  }
}

// Selectors

reducer.getBudgetItemsData = createSelector(
  rootSelector,
  ({budgetItems}) => budgetItems
)

module.exports = reducer
