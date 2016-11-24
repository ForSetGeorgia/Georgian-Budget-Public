const { getBudgetItemsData } = require('js/redux/ducks/budgetItems')
const { getSpentFinance } = require('js/redux/entities/spentFinance')

const getBudgetItem = (state, itemId) => (getBudgetItemsData(state)[itemId])

const getItemSpentFinanceIds = (state, itemId) => (
  getBudgetItem(state, itemId).spentFinances
)

const getItemSpentFinances = (state, itemId) => (
  getItemSpentFinanceIds(state, itemId).map(financeId => (
    getSpentFinance(state, financeId)
  ))
)

module.exports = {
  getBudgetItem,
  getItemSpentFinanceIds,
  getItemSpentFinances
}
