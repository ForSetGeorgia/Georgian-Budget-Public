const Ramda = require('ramda')

module.exports = Ramda.curry((timePeriod, finances) => (
  timePeriod === 'all' ? finances : finances.filter(
    f => f.timePeriod.indexOf(timePeriod) > -1
  )
))
