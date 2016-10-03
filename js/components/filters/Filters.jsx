const React = require('react')
const { object } = React.PropTypes

const BudgetItemTypeSelect = require('./container/BudgetItemTypeSelect')
const BudgetItemSelect = require('./container/BudgetItemSelect')
const FinanceTypeSelect = require('./container/FinanceTypeSelect')

const Filters = React.createClass({
  contextTypes: {
    location: object
  },

  render () {
    return (
      <div>
        <BudgetItemTypeSelect location={this.context.location} />
        <BudgetItemSelect />
        <FinanceTypeSelect location={this.context.location} />
      </div>
    )
  }
})

module.exports = Filters
