const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const MERGE_BUDGET_ITEMS = 'georgianBudget/budgetItems/MERGE_BUDGET_ITEMS'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case MERGE_BUDGET_ITEMS:
      let newBudgetItems = {}

      if (state === {}) {
        newBudgetItems = action.data
      } else {
        for (let key in action.data) {
          newBudgetItems[key] = Object.assign(
            {},
            state[key],
            action.data[key]
          )
        }
      }

      return newBudgetItems
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

reducer.getBudgetItemsData = createSelector(
  rootSelector,
  ({budgetItems}) => budgetItems
)

module.exports = reducer
