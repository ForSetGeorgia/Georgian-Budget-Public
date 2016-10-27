const React = require('react')
const TimeSeriesChart = require('js/components/TimeSeriesChart')

const BudgetItem = (props) => (
  <div className='gb-BudgetItem'>

    <h3 className='gb-BudgetItem-heading'>
      {props.name}
    </h3>

    <TimeSeriesChart
      containerId={`${props.id}-financesChart`}
      title={props.chartName}
      xAxisCategories={props.timePeriods}
      yAxisAmounts={props.amounts}
    />

  </div>
)

const { array, string } = React.PropTypes

BudgetItem.propTypes = {
  id: string.isRequired,
  chartName: string.isRequired,
  name: string.isRequired,
  timePeriods: array.isRequired,
  amounts: array.isRequired
}

module.exports = BudgetItem
