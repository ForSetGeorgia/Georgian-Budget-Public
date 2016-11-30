const React = require('react')
const { intlShape, injectIntl } = require('react-intl')
const { string } = React.PropTypes

const FinancesTimeSeries = require('./FinancesTimeSeries')
const timePeriodTypeMessages = require('js/messages/timePeriodTypes')

const BudgetItemCharts = React.createClass({
  propTypes: {
    id: string,
    selectedTimePeriod: string,
    intl: intlShape
  },

  renderChart (timePeriodType) {
    const { id, selectedTimePeriod, intl } = this.props

    const surroundingTimePeriod = timePeriodType === 'year' ? 'all' : selectedTimePeriod

    return (
      <div>
        <h3>
          {intl.formatMessage(timePeriodTypeMessages[timePeriodType])}
        </h3>
        <FinancesTimeSeries
          key={`${timePeriodType}-${selectedTimePeriod}`}
          itemIds={[id]}
          timePeriodType={timePeriodType}
          showSpentFinances
          showPlannedFinances
          inTimePeriod={surroundingTimePeriod}
        />
      </div>
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

module.exports = injectIntl(BudgetItemCharts)
