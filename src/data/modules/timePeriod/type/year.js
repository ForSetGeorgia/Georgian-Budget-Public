const { getPlannedFinancesArray } = require('src/data/modules/entities/plannedFinance')
const { getSpentFinancesArray } = require('src/data/modules/entities/spentFinance')
const { getSelectedTimePeriods } = require('src/data/ducks/filters')
const Year = {}

Year.getYearsWithData = state => (
  [...new Set(
    getSpentFinancesArray(state)
    .concat(getPlannedFinancesArray(state))
    .filter(finance => finance.timePeriodType === 'year')
    .map(finance => finance.timePeriod)
  )]
)

Year.getSelectedYears = state => {
  const selectedTimePeriods = getSelectedTimePeriods(state)

  if (selectedTimePeriods[0] === 'all') return Year.getYearsWithData(state)

  return Year.getYearsWithData(state).filter(
    availableYear => selectedTimePeriods.includes(availableYear)
  )
}

module.exports = Year
