const React = require('react')
var $ = require('jquery')

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
      'https://dev-budget.jumpstart.ge/en/api',
      {
        budgetItemIds: [6244]
      },
      function (response) {
        component.setState({
          budgetItems: response.budget_items
        })
      }
    )
  },
  render: function () {
    if (this.state.budgetItems.length === 0) {
      return (
        <div>
          Data loading!
        </div>
      )
    } else {
      return (
        <div>
          <p>this.props.inputValue</p>
          {
            this.state.budgetItems.map(
              function (budgetItem, index) {
                var uniqueId = 'time-series-chart' + index

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
