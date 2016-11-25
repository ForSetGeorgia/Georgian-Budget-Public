const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const MERGE_PLANNED_FINANCES = 'georgianBudget/plannedFinances/MERGE_PLANNED_FINANCES'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case MERGE_PLANNED_FINANCES:
      if (Object.keys(state).length === 0) {
        return Object.assign({}, action.data)
      }

      let newPlannedFinances = state

      for (let key in action.data) {
        newPlannedFinances[key] = Object.assign(
          {},
          state[key],
          action.data[key]
        )
      }

      return newPlannedFinances
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
