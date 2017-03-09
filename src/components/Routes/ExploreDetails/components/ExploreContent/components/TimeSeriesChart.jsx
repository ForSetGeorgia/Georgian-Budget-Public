const React = require('react')
const { string, array } = React.PropTypes
const { intlShape } = require('react-intl')

const TimeSeriesChart = React.createClass({

  propTypes: {
    className: string,
    exportTitle: string.isRequired,
    intl: intlShape.isRequired,
    series: array.isRequired,
    subtitle: string,
    title: string,
    uniqueChartId: string.isRequired,
    valueSuffix: string.isRequired,
    yAxisTitle: string.isRequired
  },

  plannedFinanceIndeces () {
    return this.props.series.reduce((indeces, item, index) => {
      if (item.financeType === 'plannedFinance') {
        return indeces.concat(index)
      } else {
        return indeces
      }
    }, [])
  },

  hasPlannedFinanceSeriesIndex (seriesIndex) {
    return this.plannedFinanceIndeces().includes(seriesIndex)
  },

  // When the DOM is ready, create the chart.
  componentDidMount: function () {
    const {
      uniqueChartId,
      title,
      exportTitle,
      subtitle,
      series,
      valueSuffix,
      yAxisTitle,
      intl
    } = this.props

    const { Highcharts, getHighchartsOptions } = require('src/highcharts')
    Highcharts.setOptions(getHighchartsOptions(intl))

    // mapping between SVG attributes and the corresponding options
    Highcharts.seriesTypes.column.prototype.pointAttrToOptions.dashstyle = 'dashStyle';

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
        type: 'category',
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
      uniqueChartId,
      options
    )

    const that = this

    this.chart.series.forEach((series, index) => {
      if (that.hasPlannedFinanceSeriesIndex(index)) {
        series.legendSymbol.attr('stroke-width', '2')
        series.legendSymbol.attr('stroke', 'black')
        series.legendSymbol.attr('stroke-dasharray', '5,5')
      }
    })
  },

  // Destroy chart before unmount.
  componentWillUnmount: function () {
    this.chart.destroy()
  },

  // Create the div which the chart will be rendered to.
  render: function () {
    return (
      <div
        id={this.props.uniqueChartId}
        className={this.props.className}
      />
    )
  }
})

module.exports = TimeSeriesChart
