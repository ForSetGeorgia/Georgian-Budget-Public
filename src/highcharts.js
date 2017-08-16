const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
const { defineMessages } = require('react-intl')
1
const messages = defineMessages({
  thousandsSep: {
    id: 'number.thousandsSep',
    defaultMessage: ','
  }
})

const getHighchartsOptions = intl => ({
  credits: false,
  lang: {
    decimalPoint: '.',
    thousandsSep: intl.formatMessage(messages.thousandsSep),
    numericSymbols: null
  }
})

module.exports = { Highcharts, getHighchartsOptions }
