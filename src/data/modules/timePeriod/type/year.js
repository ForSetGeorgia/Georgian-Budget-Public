const { createSelector } = require('reselect')
const { getPlannedFinancesArray } = require('src/data/modules/entities/plannedFinance')
const { getSpentFinancesArray } = require('src/data/modules/entities/spentFinance')
const { getSelectedTimePeriods } = require('src/data/ducks/filters')
const sortByStartDate = require('src/data/modules/timePeriod/sortByStartDate')

const Year = {}

Year.getYearsWithData = createSelector(
  [getSpentFinancesArray, getPlannedFinancesArray],
  (spentFinancesArray, plannedFinancesArray) => (
    [...new Set(
      sortByStartDate(
        spentFinancesArray
        .concat(plannedFinancesArray)
        .filter(finance => finance.timePeriodType === 'year')
      ).map(finance => finance.timePeriod)
    )]
  )
)

Year.getSelectedYears = state => {
  const selectedTimePeriods = getSelectedTimePeriods(state)

  if (selectedTimePeriods[0] === 'all') return Year.getYearsWithData(state)

  return Year.getYearsWithData(state).filter(
    availableYear => selectedTimePeriods.includes(availableYear)
  )
}

module.exports = Year
