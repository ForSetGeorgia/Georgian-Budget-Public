module.exports = (state = {}, action) => {
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
