const financeTypes = ['spent_finance', 'planned_finance']

const filterFinancesByPeriodType = (finances, type) => (
  finances.filter(
    f => f.timePeriodType === type
  )
)

// Select all finances with time periods that fall inside the time period
const selectInTimePeriod = (finances, timePeriod) => (
  finances.filter(
    f => f.timePeriod.indexOf(timePeriod) > -1
  )
)

module.exports = {
  financeTypes,
  filterFinancesByPeriodType,
  selectInTimePeriod
}
