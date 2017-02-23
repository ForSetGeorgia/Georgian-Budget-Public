const { createSelector } = require('reselect')
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

const getPlannedFinancesArray = createSelector(
  getPlannedFinances,
  plannedFinances => convertObjectToArray(plannedFinances)
)

module.exports = {
  getPlannedFinance,
  getItemPlannedFinances,
  getPlannedFinancesArray
}
