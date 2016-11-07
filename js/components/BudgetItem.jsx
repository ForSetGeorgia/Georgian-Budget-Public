const React = require('react')
const TimeSeriesChart = require('js/components/TimeSeriesChart')

const BudgetItem = (props) => {
  return (
    <div className='gb-BudgetItem'>

      <h3 className='gb-BudgetItem-heading'>
        {props.name}
      </h3>

      <TimeSeriesChart
        containerId={`${props.id}-${props.financeType}-${props.timePeriodType}-chart`}
        key={`${props.id}-${props.financeType}-${props.timePeriodType}-chart`}
        title={`${props.financeType}: ${props.timePeriodType}`}
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
  amounts: array.isRequired
}

module.exports = BudgetItem
