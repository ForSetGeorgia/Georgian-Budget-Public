const R = require('ramda')

module.exports = R.curry((timePeriod, finances) => (
  timePeriod === 'all' ? finances : finances.filter(
    f => f.timePeriod.indexOf(timePeriod) > -1
  )
))
