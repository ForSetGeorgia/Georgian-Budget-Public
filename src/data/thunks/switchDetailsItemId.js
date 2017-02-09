const { setDetailsItemId } = require('src/data/ducks/explore')
const { setSearch } = require('src/data/ducks/filters')

const switchDetailsItemId = (itemId) => (dispatch) => {
  dispatch(setDetailsItemId(itemId))
  dispatch(setSearch(''))
}

module.exports = switchDetailsItemId
