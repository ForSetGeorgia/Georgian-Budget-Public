const R = require('ramda')
const financeTypes = ['spentFinance', 'plannedFinance']

const filterFinancesByPeriodType = R.curry((type, finances) => (
  finances.filter(
    f => f.timePeriodType === type
  )
))

// Select all finances with time periods that fall inside the time period
const selectInTimePeriod = R.curry((timePeriod, finances) => (
  finances.filter(
    f => f.timePeriod.indexOf(timePeriod) > -1
  )
))

module.exports = {
  financeTypes,
  filterFinancesByPeriodType,
  selectInTimePeriod
}
