const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const SET_FINANCE_TYPE = 'georgianBudget/filters/SET_FINANCE_TYPE'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_FINANCE_TYPE:
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

reducer.setFinanceType = function (value) {
  return {
    type: SET_FINANCE_TYPE,
    value: value
  }
}

const getFinanceTypeFilter = createSelector(
  rootSelector,
  ({financeType}) => financeType
)

reducer.getSelectedFinanceType = createSelector(
  getFinanceTypeFilter,
  ({value}) => value
)

module.exports = reducer
