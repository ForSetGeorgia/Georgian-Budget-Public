const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)
const { defineMessages } = require('react-intl')

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
