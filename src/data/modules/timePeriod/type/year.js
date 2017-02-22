const { getSelectedTimePeriods } = require('src/data/ducks/filters')
const Year = {}

Year.getYearsWithData = () => (
  ['y2012', 'y2013', 'y2014', 'y2015', 'y2016']
)

Year.getSelectedYears = state => {
  const selectedTimePeriods = getSelectedTimePeriods(state)

  if (selectedTimePeriods[0] === 'all') return Year.getYearsWithData()

  return Year.getYearsWithData().filter(
    availableYear => selectedTimePeriods.includes(availableYear)
  )
}

module.exports = Year
