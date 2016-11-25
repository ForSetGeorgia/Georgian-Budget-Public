const React = require('react')
const { object } = React.PropTypes

const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')

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
      </div>
    )
  }
})

module.exports = Filters
