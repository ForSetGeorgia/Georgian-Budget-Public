const { Schema, arrayOf } = require('normalizr')
const spentFinance = require('./spentFinance')
const plannedFinance = require('./plannedFinance')

const budgetItem = new Schema('budgetItems', { defaults: { loaded: [] } })

budgetItem.define({
  spentFinances: arrayOf(spentFinance),
  plannedFinances: arrayOf(plannedFinance)
})

module.exports = budgetItem
