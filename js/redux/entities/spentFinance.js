const { getSpentFinances } = require('js/redux/ducks/spentFinances')

const getSpentFinance = (state, financeId) => {
  const finance = getSpentFinances(state)[financeId]
  if (!finance) throw new Error(`Spent finance with id ${financeId} could not be found in state`)
  return finance
}

module.exports = {
  getSpentFinance
}
