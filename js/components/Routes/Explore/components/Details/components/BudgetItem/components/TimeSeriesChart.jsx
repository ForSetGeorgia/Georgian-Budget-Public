const React = require('react')
const { string, array } = React.PropTypes

const TimeSeriesChart = React.createClass({

  propTypes: {
    containerId: string.isRequired,
    xAxisCategories: array.isRequired,
    yAxisDataArrays: array.isRequired,
    title: string.isRequired,
    currencyName: string.isRequired,
    subtitle: string
  },

  // When the DOM is ready, create the chart.
  componentDidMount: function () {
    const Highcharts = require('js/highcharts')
    const { currencyName } = this.props

    // Set container which the chart should render to.
    const options = {
      title: {
        text: this.props.title
      },
      subtitle: {
        text: this.props.subtitle
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{point.y}',
        valueSuffix: ` ${currencyName}`
      },
      xAxis: {
        categories: this.props.xAxisCategories
      },
      yAxis: {
        title: {
          text: this.props.title
        }
      },
      series: this.props.yAxisDataArrays.map(
        yAxisDataArray => ({
          data: yAxisDataArray
        })
      )
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
