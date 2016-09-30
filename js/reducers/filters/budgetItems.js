module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'START_LOADING_BUDGET_ITEM_FILTER':
      return Object.assign(
        {},
        state,
        {
          loading: true
        }
      )
    case 'FINISH_LOADING_BUDGET_ITEM_FILTER':
      return Object.assign(
        {},
        state,
        {
          loading: false
        }
      )
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
    case 'SET_BUDGET_ITEM_TYPE':
      if (action.value === 'total') {
        return Object.assign(
          {},
          state,
          {
            options: [],
            hidden: true
          }
        )
      }
      return Object.assign(
        {},
        state,
        {
          options: [],
          hidden: false
        }
      )
    default:
      return state
  }
}
