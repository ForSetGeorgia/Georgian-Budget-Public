const financeTypes = ['spent_finance', 'planned_finance']

const filterFinancesByPeriodType = (finances, type) => (
  finances.filter(
    f => f.timePeriodType === type
  )
)

module.exports = { financeTypes, filterFinancesByPeriodType }
