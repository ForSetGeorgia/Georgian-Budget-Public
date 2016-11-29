const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const SET_BUDGET_ITEM_TYPE = 'georgianBudget/filters/SET_BUDGET_ITEM_TYPE'
const SET_FINANCE_TYPE = 'georgianBudget/filters/SET_FINANCE_TYPE'
const SET_TIME_PERIODS = 'georgianBudget/filters/SET_TIME_PERIODS'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_BUDGET_ITEM_TYPE:
      return Object.assign(
        {},
        state,
        {
          budgetItemType: action.value
        }
      )
    case SET_FINANCE_TYPE:
      return Object.assign(
        {},
        state,
        {
          financeType: action.value
        }
      )
    case SET_TIME_PERIODS:
      return Object.assign(
        {},
        state,
        {
          timePeriods: action.timePeriods
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

reducer.setFinanceType = function (value) {
  return {
    type: SET_FINANCE_TYPE,
    value: value
  }
}

reducer.setTimePeriods = function (timePeriods) {
  return {
    type: SET_TIME_PERIODS,
    timePeriods: timePeriods
  }
}

const getFilters = createSelector(
  rootSelector,
  ({filters}) => filters
)

reducer.getSelectedFinanceType = createSelector(
  getFilters,
  ({financeType}) => financeType
)

reducer.getSelectedBudgetItemType = createSelector(
  getFilters,
  ({budgetItemType}) => budgetItemType
)

reducer.getSelectedTimePeriods = createSelector(
  getFilters,
  ({timePeriods}) => timePeriods
)

module.exports = reducer
