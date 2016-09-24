const React = require('react')

const BudgetItemSelect = require('./BudgetItemSelect')
const DataDisplay = require('./DataDisplay')

const Explore = () => (
  <main>
    <BudgetItemSelect />
    <DataDisplay />
  </main>
)

module.exports = Explore
