const React = require('react')

const BudgetItemTypeSelect = require('./BudgetItemTypeSelect')
const BudgetItemTypeSelect = require(`${NODE_PATH}/js/components/BudgetItemTypeSelect`)
const BudgetItemSelect = require('./BudgetItemSelect')
const FinanceTypeSelect = require('./FinanceTypeSelect')

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
