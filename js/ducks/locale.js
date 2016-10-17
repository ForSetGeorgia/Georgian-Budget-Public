const SET_LOCALE = 'georgianBudget/locale/SET_LOCALE'

const reducer = (state = 'ka', action) => {
  switch (action.type) {
    case SET_LOCALE:
      return action.value
    default:
      return state
  }
}

reducer.setLocale = (value) => ({
  type: SET_LOCALE,
  value: value
})

module.exports = reducer
