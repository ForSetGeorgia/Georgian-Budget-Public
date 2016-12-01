const { getPlannedFinances } = require('src/data/ducks/plannedFinances')

const getPlannedFinance = (state, financeId) => (
  getPlannedFinances(state)[financeId]
)

module.exports = {
  getPlannedFinance
}
