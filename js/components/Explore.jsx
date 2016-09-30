const React = require('react')
const Helmet = require('react-helmet')

const BudgetItemTypeSelect = require('./BudgetItemTypeSelect')
const BudgetItemSelect = require('./BudgetItemSelect')
const FinanceTypeSelect = require('./FinanceTypeSelect')
const DataDisplay = require('./DataDisplay')

const Explore = () => (
  <main>
    <Helmet
      title='Explore'
    />

    <BudgetItemTypeSelect />
    <BudgetItemSelect />
    <FinanceTypeSelect />

    <DataDisplay />
  </main>
)

module.exports = Explore
