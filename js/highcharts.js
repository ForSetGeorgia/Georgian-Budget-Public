const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)

Highcharts.setOptions({
  credits: false
})

module.exports = Highcharts
