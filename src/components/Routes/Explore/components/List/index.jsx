const React = require('react')

const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const BudgetItemSelectLists = require('./components/BudgetItemSelectLists')
const BudgetItemListFetcher = require('./components/BudgetItemListFetcher')

const ExploreList = () => (
  <div className='gb-ExploreList'>
    <BudgetItemListFetcher />

    <BudgetItemTypeSelect />
    <FinanceTypeSelect />

    <BudgetItemSelectLists />
  </div>
)

module.exports = ExploreList
