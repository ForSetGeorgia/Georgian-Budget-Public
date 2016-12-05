const { Schema } = require('normalizr')

const assignEntity = (output, key, value, input) => {
  if (key === 'amount') {
    output.amount = Number(value)
  }
}

const plannedFinance = new Schema('plannedFinances', {
  assignEntity: assignEntity
})

module.exports = plannedFinance
