const { getBudgetItemsData } = require('src/data/ducks/budgetItems')
const { getSpentFinance } = require('src/data/modules/entities/spentFinance')
const { getPlannedFinance } = require('src/data/modules/entities/plannedFinance')

const budgetItemTypes = ['priority', 'spending_agency', 'program']

const getBudgetItem = (state, itemId) => (
  getBudgetItemsData(state)[itemId]
)

const getItemSpentFinanceIds = (state, itemId) => (
  getBudgetItem(state, itemId).spentFinances
)

const getItemSpentFinances = (state, itemId) => (
  getItemSpentFinanceIds(state, itemId).map(financeId => (
    getSpentFinance(state, financeId)
  )).filter(finance => finance)
)

const getItemPlannedFinanceIds = (state, itemId) => (
  getBudgetItem(state, itemId).plannedFinances
)

const getItemPlannedFinances = (state, itemId) => (
  getItemPlannedFinanceIds(state, itemId).map(financeId => (
    getPlannedFinance(state, financeId)
  )).filter(finance => finance)
)

const filterArrayByType = (budgetItems, type) => (
  budgetItems.filter(budgetItem => budgetItem.type === type)
)

module.exports = {
  budgetItemTypes,
  getBudgetItem,
  getItemSpentFinanceIds,
  getItemSpentFinances,
  getItemPlannedFinanceIds,
  getItemPlannedFinances,
  filterArrayByType
}
