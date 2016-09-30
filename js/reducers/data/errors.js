module.exports = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ERROR': {
      let errorAlreadyExists = false
      for (var i = 0; i < state.length; i++) {
        errorAlreadyExists = state[i].text === action.text
        if (errorAlreadyExists) break
      }

      if (errorAlreadyExists) {
        return state
      } else {
        return state.concat({
          show: true,
          id: action.id,
          text: action.text
        })
      }
    }
    case 'CLEAR_ERRORS': {
      return []
    }
    default: {
      return state
    }
  }
}
