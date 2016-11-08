const React = require('react')
const { injectIntl, intlShape } = require('react-intl')

const TimeSeriesChart = require('js/components/TimeSeriesChart')

const timePeriodTypeMessages = require('js/messages/timePeriodTypes')

const BudgetItem = (props) => {
  const timePeriodTypeMessage = props.intl.formatMessage(timePeriodTypeMessages[props.timePeriodType])
  const timeSeriesChartTitle = `${props.financeType}: ${timePeriodTypeMessage}`

  return (
    <div className='gb-BudgetItem'>

      <h3 className='gb-BudgetItem-heading'>
        {props.name}
      </h3>

      <TimeSeriesChart
        containerId={`${props.id}-${props.financeType}-${props.timePeriodType}-chart`}
        key={`${props.id}-${props.financeType}-${props.timePeriodType}-chart`}
        title={timeSeriesChartTitle}
        xAxisCategories={props.timePeriods}
        yAxisAmounts={props.amounts}
      />

    </div>
  )
}

const { array, string } = React.PropTypes

BudgetItem.propTypes = {
  id: string.isRequired,
  financeType: string.isRequired,
  timePeriodType: string.isRequired,
  name: string.isRequired,
  timePeriods: array.isRequired,
  amounts: array.isRequired,
  intl: intlShape
}

module.exports = injectIntl(BudgetItem)
