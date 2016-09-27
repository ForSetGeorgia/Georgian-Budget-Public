module.exports = (state = 1, action) => {
  switch (action.type) {
    case 'SET_SELECTED_BUDGET_ITEM_ID': {
      return action.selectedItem
    }
    default: {
      return state
    }
  }
}
