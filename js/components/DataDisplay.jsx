const React = require('react')
const { arrayOf, object, bool } = React.PropTypes
const { connect } = require('react-redux')

const Error = require('js/components/Error')
const TimeSeriesChart = require('js/components/TimeSeriesChart')
const LoadingIndicator = require('js/components/LoadingIndicator')

let DataDisplay = React.createClass({
  propTypes: {
    errors: arrayOf(object).isRequired,
    loading: bool.isRequired,
    budgetItems: arrayOf(object).isRequired
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
    }

    if (this.props.loading) {
      return (
        <LoadingIndicator />
      )
    }

    if (this.props.budgetItems.length > 0) {
      return (
        <div>
          {
            this.props.budgetItems.map(
              function (budgetItem) {
                if (!budgetItem) return null

                const uniqueId = `budget-item-${budgetItem.name}-${budgetItem.chartName}`

                return <TimeSeriesChart
                  key={uniqueId}
                  containerId={uniqueId}
                  title={budgetItem.chartName}
                  subtitle={budgetItem.name}
                  xAxisCategories={budgetItem.timePeriods}
                  yAxisAmounts={budgetItem.amounts}
                />
              }
            )
          }
        </div>
      )
    }

    return <div></div>
  }
})

const mapStateToProps = function (state) {
  return state.data
}

DataDisplay = connect(mapStateToProps)(DataDisplay)

module.exports = DataDisplay
