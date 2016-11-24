const filterFinancesByPeriodType = (finances, type) => finances.filter(
  f => f.timePeriodType === type
)

module.exports = { filterFinancesByPeriodType }
