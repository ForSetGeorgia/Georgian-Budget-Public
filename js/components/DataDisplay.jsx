const React = require('react')
const { PropTypes } = require('react')
const { connect } = require('react-redux')

const Error = require('./Error')
const TimeSeriesChart = require('./TimeSeriesChart')

let DataDisplay = React.createClass({
  propTypes: {
    error: PropTypes.object.isRequired,
    budgetItems: PropTypes.array.isRequired
  },

  render: function () {
    if (this.props.error.show) {
      return (
        <Error text={this.props.error.text} />
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
                if (!budgetItem) return <p>Budget item wrong format</p>

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
    error: state.error
  }
}

DataDisplay = connect(mapStateToProps)(DataDisplay)

module.exports = DataDisplay
