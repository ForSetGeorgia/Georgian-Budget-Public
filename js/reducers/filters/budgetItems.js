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
    case 'SET_BUDGET_ITEM_FILTER_OPTIONS':
      return Object.assign(
        {},
        state,
        {
          options: action.options
        }
      )
    default:
      return state
  }
}
