const React = require('react')
const { arrayOf, object, array } = React.PropTypes
const { connect } = require('react-redux')

const Error = require('./Error')
const TimeSeriesChart = require('./TimeSeriesChart')

let DataDisplay = React.createClass({
  propTypes: {
    errors: arrayOf(object).isRequired,
    budgetItems: array.isRequired
  },

  render: function () {
    if (this.props.errors.length > 0) {
      return (
        <div>
          {
            this.props.errors.map((error) => (
              <Error text={error.text} key={error.id} />
            ))
          }
        </div>
      )
    } else if (this.props.budgetItems.length === 0) {
      return (
        <div>
          Data Loading
        </div>
      )
    } else {
      return (
        <div>
          {
            this.props.budgetItems.map(
              function (budgetItem) {
                if (!budgetItem) return null

                const uniqueId = `budget-item-${budgetItem.name}-${budgetItem.chart_name}`

                return <TimeSeriesChart
                  key={uniqueId}
                  containerId={uniqueId}
                  title={budgetItem.chart_name}
                  subtitle={budgetItem.name}
                  xAxisCategories={budgetItem.time_periods}
                  yAxisAmounts={budgetItem.amounts}
                />
              }
            )
          }
        </div>
      )
    }
  }
})

const mapStateToProps = function (state) {
  return {
    budgetItems: state.budgetItems,
    errors: state.errors
  }
}

DataDisplay = connect(mapStateToProps)(DataDisplay)

module.exports = DataDisplay
