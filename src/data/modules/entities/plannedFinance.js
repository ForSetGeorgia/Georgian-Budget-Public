const { getPlannedFinances } = require('src/data/ducks/plannedFinances')
const { getItemPlannedFinanceIds } = require('./budgetItem')
const convertObjectToArray = require('src/utilities/convertObjectToArray')

const getPlannedFinance = (state, financeId) => (
  getPlannedFinances(state)[financeId]
)

const getItemPlannedFinances = (state, itemId) => (
  getItemPlannedFinanceIds(state, itemId).map(financeId => (
    getPlannedFinance(state, financeId)
  )).filter(finance => finance)
)

const getPlannedFinancesArray = state =>
  convertObjectToArray(getPlannedFinances(state))

module.exports = {
  getPlannedFinance,
  getItemPlannedFinances,
  getPlannedFinancesArray
}
