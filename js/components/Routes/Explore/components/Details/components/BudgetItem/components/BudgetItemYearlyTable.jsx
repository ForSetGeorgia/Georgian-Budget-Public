const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')
const Griddle = require('griddle-react')

const { getYearsWithData } = require('js/redux/modules/year')
const { getItemSpentFinances } = require('js/redux/entities/budgetItem')
const { getItemPlannedFinances } = require('js/redux/entities/budgetItem')
const { translateTimePeriod } = require('js/redux/entities/timePeriod')

const getColumns = () => (
  ['year', 'spent_finance', 'planned_finance', 'difference']
)

const getDifference = (finance1, finance2) => {
  if (!finance1 || !finance2) return ''

  return finance1.amount - finance2.amount
}

const getDataForYear = (year, spentFinances, plannedFinances) => {
  const spentFinance = spentFinances.filter(f => f.timePeriod === year)[0]
  const plannedFinance = plannedFinances.filter(f => f.timePeriod === year)[0]

  return {
    year: translateTimePeriod(year),
    spent_finance: spentFinance ? spentFinance.amount : null,
    planned_finance: plannedFinance ? plannedFinance.amount : null,
    difference: getDifference(plannedFinance, spentFinance)
  }
}

const getResults = (state, itemId) => {
  const spentFinances = getItemSpentFinances(state, itemId)
  const plannedFinances = getItemPlannedFinances(state, itemId)

  return getYearsWithData().map(year => (
    getDataForYear(year, spentFinances, plannedFinances)
  ))
}

const mapStateToProps = (state, ownProps) => ({
  columns: getColumns(),
  results: getResults(state, ownProps.itemId),
  showPager: false
})

module.exports = injectIntl(connect(mapStateToProps)(Griddle))
