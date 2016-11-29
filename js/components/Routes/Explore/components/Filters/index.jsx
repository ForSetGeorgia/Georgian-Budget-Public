const React = require('react')
const { object } = React.PropTypes

const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const TimePeriodSelect = require('./components/TimePeriodSelect')

const Filters = React.createClass({
  contextTypes: {
    location: object
  },

  render () {
    return (
      <div className='gb-Filters'>
        <div className='gb-Filters-primary'>
          <BudgetItemTypeSelect />
          <FinanceTypeSelect />
        </div>
        <TimePeriodSelect />
      </div>
    )
  }
})

module.exports = Filters
