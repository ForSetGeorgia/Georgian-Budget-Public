module.exports = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ERROR': {
      return state.concat({
        show: true,
        id: action.id,
        text: action.text
      })
    }
    case 'CLEAR_ERRORS': {
      return []
    }
    default: {
      return state
    }
  }
}
