const React = require('react')
const TimeSeriesChart = require('js/components/TimeSeriesChart')

const BudgetItem = (props) => (
  <TimeSeriesChart
    containerId={`${props.id}-financesChart`}
    title={props.chartName}
    subtitle={props.name}
    xAxisCategories={props.timePeriods}
    yAxisAmounts={props.amounts}
  />
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
