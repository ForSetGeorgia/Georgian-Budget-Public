module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_BUDGET_ITEM_ID':
      return Object.assign(
        {},
        state,
        {
          selectedIds: state.selectedIds.concat(action.id)
        }
      )
    default:
      return state
  }
}
