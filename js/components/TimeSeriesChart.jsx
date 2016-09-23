const React = require('react')
const { string, array } = React.PropTypes
const Highcharts = require('highcharts')

const TimeSeriesChart = React.createClass({
  propTypes: {
    container: string.isRequired,
    timePeriods: array.isRequired,
    amounts: array.isRequired,
    name: string
  },
  // When the DOM is ready, create the chart.
  componentDidMount: function () {
    const options = {
      title: {
        text: 'Spent Finances',
        x: -20 // center
      },
      subtitle: {
        text: this.props.name,
        x: -20
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: this.props.timePeriods
      },
      yAxis: {
        title: {
          text: 'Amount Spent (lari)'
        }
      },
      series: [{
        data: this.props.amounts
      }]
    }

    // Set container which the chart should render to.
    this.chart = new Highcharts.Chart(
        this.props.container,
        options
    )
  },

  // Destroy chart before unmount.
  componentWillUnmount: function () {
    this.chart.destroy()
  },

  // Create the div which the chart will be rendered to.
  render: function () {
    return <div id={this.props.container} />
  }
})

module.exports = TimeSeriesChart
