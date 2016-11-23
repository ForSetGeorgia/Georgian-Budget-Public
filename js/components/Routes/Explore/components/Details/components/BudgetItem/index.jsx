const React = require('react')
const { injectIntl, intlShape } = require('react-intl')

const TimeSeriesChart = require('./components/TimeSeriesChart')

const timePeriodTypeMessages = require('js/messages/timePeriodTypes')

const BudgetItem = (props) => {
  const { id, name, financeType, timePeriodType, timePeriods, amounts, intl } = props

  let chart = ''

  if (financeType && timePeriodType && timePeriods && amounts && intl) {
    const timePeriodTypeMessage = intl.formatMessage(timePeriodTypeMessages[timePeriodType])
    const timeSeriesChartTitle = `${financeType}: ${timePeriodTypeMessage}`

    chart = <TimeSeriesChart
      containerId={`${id}-${financeType}-${timePeriodType}-chart`}
      key={`${id}-${financeType}-${timePeriodType}-chart`}
      title={timeSeriesChartTitle}
      xAxisCategories={timePeriods}
      yAxisAmounts={amounts}
    />
  }

  return (
    <div className='gb-BudgetItem'>

      <h3 className='gb-BudgetItem-heading'>
        {name}
      </h3>

      {chart}

    </div>
  )
}

const { array, string } = React.PropTypes

BudgetItem.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  financeType: string,
  timePeriodType: string,
  timePeriods: array,
  amounts: array,
  intl: intlShape
}

module.exports = injectIntl(BudgetItem)
