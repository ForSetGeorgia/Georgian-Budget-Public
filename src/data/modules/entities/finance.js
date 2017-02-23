const R = require('ramda')
const financeTypes = ['spentFinance', 'plannedFinance']

const filterByTimePeriodType = R.curry((type, finances) => (
  finances.filter(
    f => f.timePeriodType === type
  )
))

// Select all finances with time periods that fall inside the time period
const filterByTimePeriod = R.curry((timePeriod, finances) => (
  finances.filter(
    f => f.timePeriod.indexOf(timePeriod) > -1
  )
))

module.exports = {
  financeTypes,
  filterByTimePeriodType,
  filterByTimePeriod
}
