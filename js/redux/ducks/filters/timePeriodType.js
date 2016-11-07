const SET_TIME_PERIOD_TYPE = 'georgianBudget/filters/SET_TIME_PERIOD_TYPE'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TIME_PERIOD_TYPE:
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

reducer.setTimePeriodType = (value) => ({
  type: SET_TIME_PERIOD_TYPE,
  value: value
})

module.exports = reducer
