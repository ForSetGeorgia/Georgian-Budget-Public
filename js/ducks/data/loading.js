const reducer = (state = false, action) => {
  switch (action.type) {
    case 'BEGIN_LOADING_DATA':
      return true
    case 'FINISH_LOADING_DATA':
      return false
    default:
      return state
  }
}

module.exports = reducer
