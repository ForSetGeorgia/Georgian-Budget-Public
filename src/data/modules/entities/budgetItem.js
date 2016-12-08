const { getLocale } = require('src/data/ducks/locale')
const { getBudgetItemsData } = require('src/data/ducks/budgetItems')
const { getSpentFinance } = require('src/data/modules/entities/spentFinance')
const { getPlannedFinance } = require('src/data/modules/entities/plannedFinance')

const budgetItemTypes = ['priority', 'spending_agency', 'program']

const getBudgetItem = (state, itemId) => (
  getBudgetItemsData(state)[itemId]
)

const getItemSpentFinanceIds = (state, itemId) => (
  getBudgetItem(state, itemId).spentFinances || []
)

const getItemSpentFinances = (state, itemId) => (
  getItemSpentFinanceIds(state, itemId).map(financeId => (
    getSpentFinance(state, financeId)
  )).filter(finance => finance)
)

const getItemPlannedFinanceIds = (state, itemId) => (
  getBudgetItem(state, itemId).plannedFinances || []
)

const getItemPlannedFinances = (state, itemId) => (
  getItemPlannedFinanceIds(state, itemId).map(financeId => (
    getPlannedFinance(state, financeId)
  )).filter(finance => finance)
)

const filterArrayByType = (budgetItems, type) => (
  budgetItems.filter(budgetItem => budgetItem.type === type)
)

const getBudgetItemName = (state, itemId) => (
  getBudgetItem(state, itemId).name[getLocale(state)] || ''
)

const getBudgetItemLoaded = (state, itemId) => (
  getBudgetItem(state, itemId).loaded
)

const getDetailsLocaleId = state => (
  `details_${getLocale(state)}`
)

const getItemIsLoaded = (state, itemId) => (
  !!getBudgetItem(state, itemId)
)

const getDetailsLoadedForItem = (state, itemId) => {
  if (!getBudgetItem(state, itemId)) return false
  return getBudgetItemLoaded(state, itemId).join(',').indexOf('details') > -1
}

const getDetailsLoadedForItemCurrentLocale = (state, itemId) => {
  if (!getBudgetItem(state, itemId)) return false
  return getBudgetItemLoaded(state, itemId).includes(getDetailsLocaleId(state))
}

const getOverallBudgetIdForItem = (state, itemId) => (
  getBudgetItem(state, itemId).overallBudget
)

const getChildProgramIdsForItem = (state, itemId) => (
  getBudgetItem(state, itemId).childPrograms || []
)

module.exports = {
  budgetItemTypes,
  getBudgetItem,
  getItemSpentFinanceIds,
  getItemSpentFinances,
  getItemPlannedFinanceIds,
  getItemPlannedFinances,
  filterArrayByType,
  getBudgetItemName,
  getBudgetItemLoaded,
  getItemIsLoaded,
  getDetailsLoadedForItem,
  getDetailsLoadedForItemCurrentLocale,
  getOverallBudgetIdForItem,
  getChildProgramIdsForItem
}
