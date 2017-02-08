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

const getBudgetItemType = (state, itemId) => (
  (getBudgetItem(state, itemId) || {}).type
)

const getBudgetItemCode = (state, itemId) => (
  (getBudgetItem(state, itemId) || {}).code
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

const getRelatedBudgetItemTypes = (state, itemId) => (
  budgetItemTypes.filter(
    budgetItemType => getChildItemsOfTypeForItem(
      state,
      itemId,
      budgetItemType
    ).length > 0
  )
)

module.exports = {
  budgetItemTypes,
  getBudgetItem,
  getItemSpentFinanceIds,
  getItemPlannedFinanceIds,
  getBudgetItemName,
  getBudgetItemType,
  getBudgetItemCode,
  getItemIsLoaded,
  getOverallBudgetIdForItem,
  getPriorityIdForItem,
  getAgencyIdForItem,
  getParentProgramIdForItem,
  getChildProgramIdsForItem,
  getPriorityIdsForItem,
  getAgencyIdsForItem,
  getChildItemsOfTypeForItem,
  getRelatedBudgetItemTypes
}
