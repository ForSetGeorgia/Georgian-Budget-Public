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

const getSpentFinancesArray = state =>
  convertObjectToArray(getSpentFinances(state))

module.exports = {
  getSpentFinance,
  getItemSpentFinances,
  getSpentFinancesArray
}
