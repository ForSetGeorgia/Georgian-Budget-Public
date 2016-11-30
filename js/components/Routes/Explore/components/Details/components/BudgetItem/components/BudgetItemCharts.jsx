const React = require('react')
const { string } = React.PropTypes

const FinancesTimeSeries = require('./FinancesTimeSeries')

const BudgetItemCharts = React.createClass({
  propTypes: {
    id: string,
    selectedTimePeriod: string
  },

  renderChart (timePeriodType) {
    const { id, selectedTimePeriod } = this.props

    const surroundingTimePeriod = timePeriodType === 'year' ? 'all' : selectedTimePeriod

    return (
      <FinancesTimeSeries
        key={`${timePeriodType}-${selectedTimePeriod}`}
        itemIds={[id]}
        timePeriodType={timePeriodType}
        showSpentFinances
        showPlannedFinances
        inTimePeriod={surroundingTimePeriod}
      />
    )
  },

  render () {
    return (
      <div>
        {this.renderChart('year')}
        {this.renderChart('quarter')}
        {this.renderChart('month')}
      </div>
    )
  }
})

module.exports = BudgetItemCharts
