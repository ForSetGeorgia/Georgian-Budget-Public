const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
const { defineMessages } = require('react-intl')
1
const messages = defineMessages({
  thousandsSep: {
    id: 'number.thousandsSep',
    defaultMessage: ','
  },
  printChart: {
    id: 'chart.printChart',
    defaultMessage: 'Print chart'
  },
  downloadPNG: {
    id: 'chart.downloadPNG',
    defaultMessage: 'Download PNG image'
  },
  downloadJPEG: {
    id: 'chart.downloadJPEG',
    defaultMessage: 'Download JPEG image'
  },
  downloadPDF: {
    id: 'chart.downloadPDF',
    defaultMessage: 'Download PDF document'
  },
  downloadSVG: {
    id: 'chart.downloadSVG',
    defaultMessage: 'Download SVG vector image'
  },
  downloadCSV: {
    id: 'chart.downloadCSV',
    defaultMessage: 'Download CSV'
  },
  downloadXLS: {
    id: 'chart.downloadXLS',
    defaultMessage: 'Download XLS'
  }
})

const getHighchartsOptions = intl => ({
  credits: false,
  lang: {
    decimalPoint: '.',
    thousandsSep: intl.formatMessage(messages.thousandsSep),
    numericSymbols: null,
    printChart: intl.formatMessage(messages.printChart),
    downloadPNG: intl.formatMessage(messages.downloadPNG),
    downloadJPEG: intl.formatMessage(messages.downloadJPEG),
    downloadPDF: intl.formatMessage(messages.downloadPDF),
    downloadSVG: intl.formatMessage(messages.downloadSVG),
    downloadCSV: intl.formatMessage(messages.downloadCSV),
    downloadXLS: intl.formatMessage(messages.downloadXLS)
  }
})

module.exports = { Highcharts, getHighchartsOptions }
