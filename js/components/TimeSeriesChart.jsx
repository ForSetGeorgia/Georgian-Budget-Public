const React = require('react')
const { string, array } = React.PropTypes

const TimeSeriesChart = React.createClass({

  propTypes: {
    containerId: string.isRequired,
    xAxisCategories: array.isRequired,
    yAxisAmounts: array.isRequired,
    title: string.isRequired,
    subtitle: string
  },

  // When the DOM is ready, create the chart.
  componentDidMount: function () {
    const Highcharts = require('../highcharts')
    
    // Set container which the chart should render to.
    const options = {
      title: {
        text: this.props.title,
        x: -20 // center
      },
      subtitle: {
        text: this.props.subtitle,
        x: -20
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: this.props.xAxisCategories
      },
      yAxis: {
        title: {
          text: 'Amount Spent (lari)'
        }
      },
      series: [{
        data: this.props.yAxisAmounts
      }]
    }

    this.chart = new Highcharts.Chart(
      this.props.containerId,
      options
    )
  },

  // Destroy chart before unmount.
  componentWillUnmount: function () {
    this.chart.destroy()
  },

  // Create the div which the chart will be rendered to.
  render: function () {
    return <div id={this.props.containerId} />
  }
})

module.exports = TimeSeriesChart
