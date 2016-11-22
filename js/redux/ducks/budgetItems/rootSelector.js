const { createSelector } = require('reselect')
const parentSelector = require('../rootSelector')

module.exports = createSelector(
  parentSelector,
  ({budgetItems}) => budgetItems
)
