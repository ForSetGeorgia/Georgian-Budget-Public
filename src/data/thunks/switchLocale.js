const { setLocale } = require('src/data/ducks/locale')
const { setSearch } = require('src/data/ducks/filters')

const switchLocale = (newLocale) => (dispatch, getState) => {
  dispatch(setLocale(newLocale))
  dispatch(setSearch(''))
}

module.exports = switchLocale
