module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_BUDGET_ITEM_IDS':
      return Object.assign(
        {},
        state,
        {
          selectedIds: action.ids
        }
      )
    default:
      return state
  }
}
