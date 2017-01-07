const { getLocale } = require('src/data/ducks/locale')
const { getExploreListLoaded } = require('src/data/ducks/explore')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { getBudgetItem } = require('../budgetItem')

const getDetailsLocaleId = state => (
  `details_${getLocale(state)}`
)

const getBudgetItemLoaded = (state, itemId) => (
  getBudgetItem(state, itemId).loaded
)

const getDetailsLoadedForItem = (state, itemId) => {
  if (!getBudgetItem(state, itemId)) return false
  return getBudgetItemLoaded(state, itemId).join(',').indexOf('details') > -1
}

const getDetailsLoadedForItemCurrentLocale = (state, itemId) => (
  !!getBudgetItem(state, itemId) && getBudgetItemLoaded(state, itemId).includes(getDetailsLocaleId(state))
)

const getCurrentItemListLoadedId = state => (
  `${getSelectedBudgetItemType(state)}_${getLocale(state)}`
)

const getCurrentItemListLoaded = state => (
  getExploreListLoaded(state).includes(
    getCurrentItemListLoadedId(state)
  )
)

module.exports = {
  getDetailsLocaleId,
  getDetailsLoadedForItem,
  getDetailsLoadedForItemCurrentLocale,
  getCurrentItemListLoadedId,
  getCurrentItemListLoaded
}
