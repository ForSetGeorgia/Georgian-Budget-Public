const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const MERGE_SPENT_FINANCES = 'georgianBudget/spentFinances/MERGE_SPENT_FINANCES'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case MERGE_SPENT_FINANCES:
      if (Object.keys(state).length === 0) {
        return Object.assign(state, action.data)
      }

      let newSpentFinances = Object.assign({}, state)

      for (let key in action.data) {
        newSpentFinances[key] = Object.assign(
          {},
          state[key],
          action.data[key]
        )
      }

      return newSpentFinances
    default:
      return state
  }
}

reducer.mergeSpentFinances = spentFinances => ({
  type: MERGE_SPENT_FINANCES,
  data: spentFinances
})

reducer.getSpentFinances = createSelector(
  rootSelector,
  ({spentFinances}) => spentFinances
)

module.exports = reducer
