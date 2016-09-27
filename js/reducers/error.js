module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ERROR': {
      return {
        show: true,
        text: action.text
      }
    }
    case 'CLEAR_ERROR': {
      return {
        show: false,
        text: ''
      }
    }
    default: {
      return state
    }
  }
}
