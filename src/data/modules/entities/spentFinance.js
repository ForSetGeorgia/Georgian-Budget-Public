const { getSpentFinances } = require('src/data/ducks/spentFinances')
const { getItemSpentFinanceIds } = require('./budgetItem')

const getSpentFinance = (state, financeId) => (
  getSpentFinances(state)[financeId]
)

const getItemSpentFinances = (state, itemId) => (
  getItemSpentFinanceIds(state, itemId).map(financeId => (
    getSpentFinance(state, financeId)
  )).filter(finance => finance)
)

module.exports = {
  getSpentFinance,
  getItemSpentFinances
}
