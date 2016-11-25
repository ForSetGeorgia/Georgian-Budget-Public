const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const deepMergeEntities = require('js/deepMergeEntities')

const MERGE_BUDGET_ITEMS = 'georgianBudget/budgetItems/MERGE_BUDGET_ITEMS'
const MARK_DETAILS_LOADED = 'georgianBudget/budgetItems/MARK_DETAILS_LOADED'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case MERGE_BUDGET_ITEMS:
      return deepMergeEntities(state, action.data)
    case MARK_DETAILS_LOADED:
      const newState = Object.assign({}, state)
      const budgetItem = newState[action.itemId]

      if (!budgetItem) return state

      newState[action.itemId] = Object.assign(
        {},
        budgetItem,
        {
          loaded: budgetItem.loaded.concat('details')
        }
      )

      return newState
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

reducer.markBudgetItemDetailsLoaded = (itemId) => ({
  type: MARK_DETAILS_LOADED,
  itemId: itemId
})

// Selectors

reducer.getBudgetItemsData = createSelector(
  rootSelector,
  ({budgetItems}) => budgetItems
)

module.exports = reducer
