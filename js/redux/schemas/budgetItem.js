const { Schema } = require('normalizr')

const budgetItem = new Schema('budgetItems', { defaults: { loaded: [] } })

module.exports = budgetItem
