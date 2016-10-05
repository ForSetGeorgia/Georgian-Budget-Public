module.exports = (state = 'ka', action) => {
  switch (action.type) {
    case 'SET_LOCALE':
      return action.value
    default:
      return state
  }
}
