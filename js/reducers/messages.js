module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return action.messages
    default:
      return state
  }
}
