const { getBudgetItemsData } = require('js/redux/ducks/budgetItems')
const { getSpentFinance } = require('js/redux/entities/spentFinance')
const { getPlannedFinance } = require('js/redux/entities/plannedFinance')

const getBudgetItem = (state, itemId) => (getBudgetItemsData(state)[itemId])

const getItemSpentFinanceIds = (state, itemId) => (
  getBudgetItem(state, itemId).spentFinances
)

const getItemSpentFinances = (state, itemId) => (
  getItemSpentFinanceIds(state, itemId).map(financeId => (
    getSpentFinance(state, financeId)
  ))
)

const getItemPlannedFinanceIds = (state, itemId) => (
  getBudgetItem(state, itemId).plannedFinances
)

const getItemPlannedFinances = (state, itemId) => (
  getItemPlannedFinanceIds(state, itemId).map(financeId => (
    getPlannedFinance(state, financeId)
  ))
)

module.exports = {
  getBudgetItem,
  getItemSpentFinanceIds,
  getItemSpentFinances,
  getItemPlannedFinanceIds,
  getItemPlannedFinances
}
