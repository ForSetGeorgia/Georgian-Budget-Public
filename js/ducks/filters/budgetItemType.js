module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'SET_BUDGET_ITEM_TYPE':
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
