const React = require('react')
const $ = require('jquery')

const TimeSeriesChart = require('./TimeSeriesChart')

const DataDisplay = React.createClass({
  getInitialState: function () {
    return {
      budgetItems: []
    }
  },
  componentDidMount: function () {
    const component = this
    $.getJSON(
      'https://dev-budget.jumpstart.ge/en/api/v1',
      {
        financeType: 'spent_finance',
        budgetItemIds: [1366, 990]
      },
      function (response) {
        component.setState({
          error: response.error,
          budgetItems: response.budget_items
        })
      }
    )
  },
  render: function () {
    if (this.state.error) {
      return (
        <div>
          API Error: {this.state.error}
        </div>
      )
    } else if (this.state.budgetItems.length === 0) {
      return (
        <div>
          Data Loading
        </div>
      )
    } else {
      return (
        <div>
          <p>this.props.inputValue</p>
          {
            this.state.budgetItems.map(
              function (budgetItem, index) {
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

module.exports = DataDisplay
