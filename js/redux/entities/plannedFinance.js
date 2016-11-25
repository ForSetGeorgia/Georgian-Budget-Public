const { getPlannedFinances } = require('js/redux/ducks/plannedFinances')

const getPlannedFinance = (state, financeId) => {
  const finance = getPlannedFinances(state)[financeId]
  if (!finance) throw new Error(`Planned finance with id ${financeId} could not be found in state`)
  return finance
}

module.exports = {
  getPlannedFinance
}
