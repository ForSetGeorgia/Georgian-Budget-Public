const React = require('react')
const { string, array } = React.PropTypes
const { intlShape } = require('react-intl')

const TimeSeriesChart = React.createClass({

  propTypes: {
    className: string,
    exportTitle: string.isRequired,
    exportSubTitle: string.isRequired,
    intl: intlShape.isRequired,
    categories: array.isRequired,
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
      exportSubTitle,
      subtitle,
      categories,
      series,
      valueSuffix,
      yAxisTitle,
      intl
    } = this.props

    const { Highcharts, getHighchartsOptions } = require('src/highcharts')
    Highcharts.setOptions(getHighchartsOptions(intl))

    // mapping between SVG attributes and the corresponding options, removed due error and default support in newer version of highcharts
    // Highcharts.seriesTypes.column.prototype.pointAttrToOptions.dashstyle = 'dashStyle'

    // Set container which the chart should render to.
    const menuItems = Highcharts.defaultOptions.exporting.buttons.contextButton.menuItems.filter((f) => { return f !== 'viewData' })

    const options = {
      chart: {
        type: 'column'
      },
      exporting: {
        chartOptions: {
          title: {
            text: exportTitle
          },
          subtitle: {
            text: exportSubTitle
          }
        },
        buttons: {
          contextButton: {
            menuItems: menuItems
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
        categories: categories,
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

    const that = this

    this.chart = new Highcharts.Chart(
      uniqueChartId,
      options,
      function (chartObject) {
        chartObject.series.forEach((series, index) => {
          if (that.hasPlannedFinanceSeriesIndex(index)) {
            series.legendSymbol.attr('stroke-width', '2')
            series.legendSymbol.attr('stroke', 'black')
            if (!series.userOptions.official) {
              series.legendSymbol.attr('stroke-dasharray', '5,5')
            }
          }
        })
        chartObject.renderer.defs.element.innerHTML += '<pattern id="highchartPattern" patternUnits="userSpaceOnUse" width="8" height="8"> <rect  x="0" y="0" width="8" height="8" stroke="transparent" fill="rgb(255, 191, 31)"></rect> <path stroke="rgb(237, 235, 243)" stroke-width="2" d="M-2.008,1.997l4.004-4.004 M-0.005,8.006l8.011-8.01 M6.002,10.008l4.006-4.006"/> </pattern>'
      }
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
        id={this.props.uniqueChartId}
        className={this.props.className}
      />
    )
  }
})

module.exports = TimeSeriesChart
