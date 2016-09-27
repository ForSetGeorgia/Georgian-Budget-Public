const React = require('react')
const { PropTypes } = require('react')
const { connect } = require('react-redux')

const TimeSeriesChart = require('./TimeSeriesChart')

let DataDisplay = React.createClass({
  propTypes: {
    error: PropTypes.object.isRequired,
    budgetItems: PropTypes.array.isRequired
  },

  render: function () {
    if (this.props.error.show) {
      return (
        <div>
          API Error: {this.props.error.text}
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
                if (!budgetItem) return <p>Budget item wrong format</p>

                const uniqueId = `budget-item-${budgetItem.name}`

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
