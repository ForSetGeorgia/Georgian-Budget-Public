const React = require('react')
const { injectIntl, intlShape } = require('react-intl')

const TimeSeriesChart = require('./TimeSeriesChart')
const timePeriodTypeMessages = require('js/messages/timePeriodTypes')

const FinancesTimeSeries = React.createClass({
  propTypes: {
    intl: intlShape
  },

  render () {
    const { id, financeType, timePeriodType, timePeriods, amounts, intl } = this.props

    const timePeriodTypeMessage = intl.formatMessage(
      timePeriodTypeMessages[timePeriodType]
    )

    const timeSeriesChartTitle = `${financeType}: ${timePeriodTypeMessage}`

    return (<TimeSeriesChart
      containerId={`${id}-${financeType}-${timePeriodType}-chart`}
      key={`${id}-${financeType}-${timePeriodType}-chart`}
      title={timeSeriesChartTitle}
      xAxisCategories={timePeriods}
      yAxisAmounts={amounts}
    />)
  }
})

module.exports = injectIntl(FinancesTimeSeries)
