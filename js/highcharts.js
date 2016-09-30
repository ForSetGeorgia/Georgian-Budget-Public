const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)

Highcharts.setOptions({
  credits: false,
  lang: {
    decimalPoint: '.',
    thousandsSep: ' ',
    numericSymbols: null
  }
})

module.exports = Highcharts
