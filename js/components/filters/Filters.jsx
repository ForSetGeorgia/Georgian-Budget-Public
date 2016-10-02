const React = require('react')

const BudgetItemTypeSelect = require('./presentation/BudgetItemTypeSelect')
const BudgetItemSelect = require('./container/BudgetItemSelect')
const FinanceTypeSelect = require('./presentation/FinanceTypeSelect')

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
