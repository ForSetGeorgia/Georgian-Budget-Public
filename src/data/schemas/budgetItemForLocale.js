const { Schema, arrayOf } = require('normalizr')
const spentFinance = require('./spentFinance')
const plannedFinance = require('./plannedFinance')

const makeAssignEntity = locale => (output, key, value, input) => {
  if (key === 'name') {
    output.name = {}
    output.name[locale] = value
  }
}

const createLocalizedSchema = locale => {
  const budgetItem = new Schema('budgetItems', {
    defaults: { loaded: [] },
    assignEntity: makeAssignEntity(locale)
  })

  budgetItem.define({
    spentFinances: arrayOf(spentFinance),
    plannedFinances: arrayOf(plannedFinance),
    overallBudget: budgetItem,
    childPrograms: arrayOf(budgetItem),
    priorities: arrayOf(budgetItem),
    spendingAgencies: arrayOf(budgetItem)
  })

  return budgetItem
}

module.exports = createLocalizedSchema
