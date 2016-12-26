const React = require('react')
const { string, array } = React.PropTypes

const TimeSeriesChart = React.createClass({

  propTypes: {
    containerId: string.isRequired,
    xAxisCategories: array.isRequired,
    series: array.isRequired,
    title: string,
    valueSuffix: string.isRequired,
    yAxisTitle: string.isRequired,
    subtitle: string
  },

  // When the DOM is ready, create the chart.
  componentDidMount: function () {
    const Highcharts = require('src/highcharts')
    const {
      containerId,
      title,
      subtitle,
      xAxisCategories,
      series,
      valueSuffix,
      yAxisTitle
    } = this.props

    // Set container which the chart should render to.
    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: title
      },
      subtitle: {
        text: subtitle
      },
      legend: {
        enabled: true
      },
      tooltip: {
        shared: true,
        valueSuffix: ` ${valueSuffix}`
      },
      xAxis: {
        categories: xAxisCategories,
        crosshair: true
      },
      yAxis: {
        title: {
          text: yAxisTitle
        }
      },
      plotOptions: {
        column: {
          grouping: false
        }
      },
      series: series
    }

    this.chart = new Highcharts.Chart(
      containerId,
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
