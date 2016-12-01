const Difference = {}

const maxTwoDecimal = num => {
  if (Math.round(num) === num) {
    return num
  } else {
    return num.toFixed(2)
  }
}

Difference.getFinanceDifference = (finance1, finance2) => {
  if (!finance1 || !finance2) return ''

  return maxTwoDecimal(finance1.amount - finance2.amount)
}

module.exports = Difference
