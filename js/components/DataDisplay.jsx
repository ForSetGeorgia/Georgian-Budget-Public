const React = require('react')
const { PropTypes } = require('react')
const { connect } = require('react-redux')

const TimeSeriesChart = require('./TimeSeriesChart')

let DataDisplay = React.createClass({
  propTypes: {
    error: PropTypes.string.isRequired,
    budgetItems: PropTypes.array.isRequired
  },
  render: function () {
    if (this.props.error.length > 0) {
      return (
        <div>
          API Error: {this.props.error}
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
              function (budgetItem, index) {
                if (!budgetItem) return <p>Budget item wrong format</p>

                const uniqueId = 'time-series-chart' + index

                return <TimeSeriesChart
                  key={uniqueId}
                  container={uniqueId}
                  name={budgetItem.name}
                  timePeriods={budgetItem.time_periods}
                  amounts={budgetItem.amounts}
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
