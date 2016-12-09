const { getPlannedFinances } = require('src/data/ducks/plannedFinances')
const { getItemPlannedFinanceIds } = require('./budgetItem')

const getPlannedFinance = (state, financeId) => (
  getPlannedFinances(state)[financeId]
)

const getItemPlannedFinances = (state, itemId) => (
  getItemPlannedFinanceIds(state, itemId).map(financeId => (
    getPlannedFinance(state, financeId)
  )).filter(finance => finance)
)

module.exports = {
  getPlannedFinance,
  getItemPlannedFinances
}
