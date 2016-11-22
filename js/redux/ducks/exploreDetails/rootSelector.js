const { createSelector } = require('reselect')
const parentSelector = require('../rootSelector')

module.exports = createSelector(
  parentSelector,
  ({exploreDetails}) => exploreDetails
)
