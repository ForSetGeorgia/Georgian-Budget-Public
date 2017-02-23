const { createSelector } = require('reselect')
const { getSpentFinances } = require('src/data/ducks/spentFinances')
const { getItemSpentFinanceIds } = require('./budgetItem')
const convertObjectToArray = require('src/utilities/convertObjectToArray')

const getSpentFinance = (state, financeId) => (
  getSpentFinances(state)[financeId]
)

const getItemSpentFinances = (state, itemId) => (
  getItemSpentFinanceIds(state, itemId).map(financeId => (
    getSpentFinance(state, financeId)
  )).filter(finance => finance)
)

const getSpentFinancesArray = createSelector(
  getSpentFinances,
  spentFinances => convertObjectToArray(spentFinances)
)

module.exports = {
  getSpentFinance,
  getItemSpentFinances,
  getSpentFinancesArray
}
