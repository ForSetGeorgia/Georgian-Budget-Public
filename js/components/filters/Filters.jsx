const React = require('react')

const BudgetItemTypeSelect = require('./container/BudgetItemTypeSelect')
const BudgetItemSelect = require('./container/BudgetItemSelect')
const FinanceTypeSelect = require('./container/FinanceTypeSelect')

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
