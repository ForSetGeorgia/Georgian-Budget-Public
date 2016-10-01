const React = require('react')

const BudgetItemTypeSelect = require('js/components/BudgetItemTypeSelect')
const BudgetItemSelect = require('js/components/BudgetItemSelect')
const FinanceTypeSelect = require('js/components/FinanceTypeSelect')

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
