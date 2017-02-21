const React = require('react')
const { string, array } = React.PropTypes
const { intlShape } = require('react-intl')

const TimeSeriesChart = React.createClass({

  propTypes: {
    containerId: string.isRequired,
    xAxisCategories: array.isRequired,
    series: array.isRequired,
    title: string,
    exportTitle: string.isRequired,
    valueSuffix: string.isRequired,
    yAxisTitle: string.isRequired,
    subtitle: string,
    className: string,
    intl: intlShape.isRequired
  },

  // When the DOM is ready, create the chart.
  componentDidMount: function () {
    const {
      containerId,
      title,
      exportTitle,
      subtitle,
      xAxisCategories,
      series,
      valueSuffix,
      yAxisTitle,
      intl
    } = this.props

    const { Highcharts, getHighchartsOptions } = require('src/highcharts')
    Highcharts.setOptions(getHighchartsOptions(intl))

    // Set container which the chart should render to.
    const options = {
      chart: {
        type: 'column'
      },
      exporting: {
        chartOptions: {
          title: {
            text: exportTitle
          }
        }
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
        valueSuffix: ` ${valueSuffix}`,
        valueDecimals: 0
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
    return (
      <div
        id={this.props.containerId}
        className={this.props.className}
      />
    )
  }
})

module.exports = TimeSeriesChart
