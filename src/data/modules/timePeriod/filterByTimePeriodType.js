const Ramda = require('ramda')

module.exports = Ramda.curry((type, finances) => (
  finances.filter(
    f => f.timePeriodType === type
  )
))
