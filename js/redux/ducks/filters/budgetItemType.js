const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const SET_BUDGET_ITEM_TYPE = 'georgianBudget/filters/budgetItemType/SET_BUDGET_ITEM_TYPE'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_BUDGET_ITEM_TYPE:
      return Object.assign(
        {},
        state,
        {
          value: action.value
        }
      )
    default:
      return state
  }
}

reducer.setBudgetItemType = (value) => ({
  type: SET_BUDGET_ITEM_TYPE,
  value: value
})

const getBudgetItemType = createSelector(
  rootSelector,
  ({budgetItemType}) => budgetItemType
)

reducer.getSelectedBudgetItemType = createSelector(
  getBudgetItemType,
  ({value}) => value
)

module.exports = reducer
