const React = require('react')

const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const BudgetItemSelect = require('./components/BudgetItemSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')

const Filters = React.createClass({
  render () {
    return (
      <div>
        <BudgetItemTypeSelect />
        <BudgetItemSelect />
        <FinanceTypeSelect />
      </div>
    )
  }
})

module.exports = Filters
