const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const deepMergeEntities = require('src/deepMergeEntities')

const MERGE_PLANNED_FINANCES = 'georgianBudget/plannedFinances/MERGE_PLANNED_FINANCES'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case MERGE_PLANNED_FINANCES:
      return deepMergeEntities(state, action.data)
    default:
      return state
  }
}

reducer.mergePlannedFinances = plannedFinances => ({
  type: MERGE_PLANNED_FINANCES,
  data: plannedFinances
})

reducer.getPlannedFinances = createSelector(
  rootSelector,
  ({plannedFinances}) => plannedFinances
)

module.exports = reducer
