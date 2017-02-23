const R = require('ramda')

module.exports = R.curry((type, finances) => (
  finances.filter(
    f => f.timePeriodType === type
  )
))
