const decimalPlaces = require('src/utilities/decimalPlaces')

const Difference = {}

const maxTwoDecimal = num => {
  if (decimalPlaces(num) <= 2) {
    return num
  } else {
    return parseFloat(num.toFixed(2))
  }
}

Difference.getFinanceDifference = (finance1, finance2) => {
  if (!finance1 || !finance2) return null

  return maxTwoDecimal(finance1.amount - finance2.amount)
}

module.exports = Difference
