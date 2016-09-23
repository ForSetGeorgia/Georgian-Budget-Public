const React = require('react')

const BudgetItemSelect = require('./BudgetItemSelect')
const DataDisplay = require('./DataDisplay')

const App = function () {
  return (
    <main>
      <BudgetItemSelect />
      <DataDisplay />
    </main>
  )
}

module.exports = App
