const { getLocale } = require('src/data/ducks/locale')
const { getExploreListLoaded } = require('src/data/ducks/explore')
const { getBudgetItemsData } = require('src/data/ducks/budgetItems')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { getDetailsItemId } = require('src/data/ducks/explore')

const {
  getChildItemsOfTypeForItem
} = require('src/data/modules/entities/budgetItem')

const getCurrentListLoadedId = state => (
  `${getSelectedBudgetItemType(state)}_${getLocale(state)}`
)

const getCurrentListLoaded = state => (
  getExploreListLoaded(state).includes(
    getCurrentListLoadedId(state)
  )
)

const getListedItemIds = (state) => {
  const itemId = getDetailsItemId(state)
  const budgetItemType = getSelectedBudgetItemType(state)
  const budgetItems = getBudgetItemsData(state)
  const budgetItemIds = Object.keys(budgetItems)

  const childrenOfItem = getChildItemsOfTypeForItem(state, itemId, budgetItemType)

  return budgetItemIds.filter(
    id => childrenOfItem.indexOf(id) > -1
  )
}

module.exports = {
  getCurrentListLoadedId,
  getCurrentListLoaded,
  getListedItemIds
}
