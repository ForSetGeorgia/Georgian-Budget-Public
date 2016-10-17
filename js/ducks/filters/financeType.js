const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FINANCE_TYPE':
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
    type: 'SET_FINANCE_TYPE',
    value: value
  }
}

module.exports = reducer
