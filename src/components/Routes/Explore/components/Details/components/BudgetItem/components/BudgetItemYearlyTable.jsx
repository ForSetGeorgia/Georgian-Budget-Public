const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')
const Griddle = require('griddle-react')

const { getYearsWithData } = require('src/data/modules/timePeriod/type/year')
const { getItemSpentFinances } = require('src/data/modules/entities/budgetItem')
const { getItemPlannedFinances } = require('src/data/modules/entities/budgetItem')
const { translateTimePeriod } = require('src/data/modules/timePeriod/translate')
const { getSelectedTimePeriods } = require('src/data/ducks/filters')
const { getFinanceDifference } = require('src/data/modules/finance/difference')

const getColumns = () => (
  ['year', 'spent_finance', 'planned_finance', 'difference']
)

const getDataForYear = (year, spentFinances, plannedFinances) => {
  const spentFinance = spentFinances.filter(f => f.timePeriod === year)[0]
  const plannedFinance = plannedFinances.filter(f => f.timePeriod === year)[0]

  return {
    year: translateTimePeriod(year),
    spent_finance: spentFinance ? spentFinance.amount : null,
    planned_finance: plannedFinance ? plannedFinance.amount : null,
    difference: getFinanceDifference(plannedFinance, spentFinance)
  }
}

const getVisibleYears = (state) => {
  const years = getYearsWithData()
  const selectedTimePeriod = getSelectedTimePeriods(state)[0]

  if (selectedTimePeriod === 'all') return years

  return years.filter(year => year === selectedTimePeriod)
}

const getResults = (state, itemId) => {
  const spentFinances = getItemSpentFinances(state, itemId)
  const plannedFinances = getItemPlannedFinances(state, itemId)

  return getVisibleYears(state).map(year => (
    getDataForYear(year, spentFinances, plannedFinances)
  ))
}

const mapStateToProps = (state, ownProps) => ({
  columns: getColumns(),
  results: getResults(state, ownProps.itemId),
  showPager: false
})

module.exports = injectIntl(connect(mapStateToProps)(Griddle))
