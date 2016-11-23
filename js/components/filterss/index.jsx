const React = require('react')
const { object } = React.PropTypes

const BudgetItemTypeSelect = require('./container/BudgetItemTypeSelect')
const BudgetItemSelect = require('./container/BudgetItemSelect')
const FinanceTypeSelect = require('./container/FinanceTypeSelect')
const TimePeriodTypeSelect = require('./container/TimePeriodTypeSelect')

const Filters = React.createClass({
  contextTypes: {
    location: object
  },

  render () {
    return (
      <div className='gb-Filters'>
        <div className='gb-Filters-primary'>
          <BudgetItemTypeSelect location={this.context.location} />
          <FinanceTypeSelect location={this.context.location} />
        </div>
        <TimePeriodTypeSelect />
        <BudgetItemSelect location={this.context.location} />
      </div>
    )
  }
})

module.exports = Filters
