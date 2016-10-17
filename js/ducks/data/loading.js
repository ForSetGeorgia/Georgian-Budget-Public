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

reducer.beginLoadingData = () => ({
  type: 'BEGIN_LOADING_DATA'
})

reducer.finishLoadingData = () => ({
  type: 'FINISH_LOADING_DATA'
})

module.exports = reducer
