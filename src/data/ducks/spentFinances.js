const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const deepMergeEntities = require('src/data/deepMergeEntities')

const MERGE_SPENT_FINANCES = 'georgianBudget/spentFinances/MERGE_SPENT_FINANCES'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case MERGE_SPENT_FINANCES:
      return deepMergeEntities(state, action.data)
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
