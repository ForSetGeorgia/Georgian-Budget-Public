const { getLocale } = require('src/data/ducks/locale')
const { getBudgetItemsData } = require('src/data/ducks/budgetItems')

const budgetItemTypes = ['priority', 'spendingAgency', 'program']

const getBudgetItem = (state, itemId) => (
  getBudgetItemsData(state)[itemId]
)

const getItemSpentFinanceIds = (state, itemId) => (
  getBudgetItem(state, itemId).spentFinances || []
)

const getItemPlannedFinanceIds = (state, itemId) => (
  getBudgetItem(state, itemId).plannedFinances || []
)

const getBudgetItemName = (state, itemId) => (
  ((getBudgetItem(state, itemId) || {}).name || {})[getLocale(state)] || ''
)

const getItemIsLoaded = (state, itemId) => (
  !!getBudgetItem(state, itemId)
)

const getOverallBudgetIdForItem = (state, itemId) => (
  getBudgetItem(state, itemId).overallBudget
)

const getChildProgramIdsForItem = (state, itemId) => (
  (getBudgetItem(state, itemId) || {}).childPrograms || []
)

const getPriorityIdsForItem = (state, itemId) => (
  (getBudgetItem(state, itemId) || {}).priorities || []
)

const getAgencyIdsForItem = (state, itemId) => (
  (getBudgetItem(state, itemId) || {}).spendingAgencies || []
)

const getPriorityIdForItem = (state, itemId) => (
  (getBudgetItem(state, itemId) || {}).priority
)

const getAgencyIdForItem = (state, itemId) => (
  (getBudgetItem(state, itemId) || {}).spendingAgency
)

const getParentProgramIdForItem = (state, itemId) => (
  (getBudgetItem(state, itemId) || {}).parentProgram
)

const getChildItemsOfTypeForItem = (state, itemId, budgetItemType) => {
  if (budgetItemType === 'program') {
    return getChildProgramIdsForItem(state, itemId)
  } else if (budgetItemType === 'priority') {
    return getPriorityIdsForItem(state, itemId)
  } else if (budgetItemType === 'spendingAgency') {
    return getAgencyIdsForItem(state, itemId)
  } else {
    return []
  }
}

module.exports = {
  budgetItemTypes,
  getBudgetItem,
  getItemSpentFinanceIds,
  getItemPlannedFinanceIds,
  getBudgetItemName,
  getItemIsLoaded,
  getOverallBudgetIdForItem,
  getPriorityIdForItem,
  getAgencyIdForItem,
  getParentProgramIdForItem,
  getChildProgramIdsForItem,
  getPriorityIdsForItem,
  getAgencyIdsForItem,
  getChildItemsOfTypeForItem
}
