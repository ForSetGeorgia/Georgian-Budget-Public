const { getPlannedFinances } = require('js/redux/ducks/plannedFinances')

const getPlannedFinance = (state, financeId) => (
  getPlannedFinances(state)[financeId]
)

module.exports = {
  getPlannedFinance
}
