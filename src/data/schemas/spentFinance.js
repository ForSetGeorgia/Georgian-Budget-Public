const { Schema } = require('normalizr')

const assignEntity = (output, key, value, input) => {
  if (key === 'amount') {
    output.amount = Number(value)
  }
}

const spentFinance = new Schema('spentFinances', {
  assignEntity: assignEntity
})

module.exports = spentFinance
