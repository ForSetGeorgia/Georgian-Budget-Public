const { getPlannedFinances } = require('js/data/ducks/plannedFinances')

const getPlannedFinance = (state, financeId) => (
  getPlannedFinances(state)[financeId]
)

module.exports = {
  getPlannedFinance
}
