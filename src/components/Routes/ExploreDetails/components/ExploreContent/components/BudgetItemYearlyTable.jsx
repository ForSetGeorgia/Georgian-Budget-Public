const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getSelectedYears } = require('src/data/modules/timePeriod/type/year')
const { getItemSpentFinances } = require('src/data/modules/entities/spentFinance')
const { getItemPlannedFinances } = require('src/data/modules/entities/plannedFinance')
const { translateTimePeriod } = require('src/data/modules/timePeriod/translate')
const { getDetailsItemId } = require('src/data/ducks/explore')

const timePeriodTypeMessages = require('src/messages/timePeriodTypes')
const financeTypeMessages = require('src/messages/financeTypes')

const CustomGriddle = require('src/components/shared/CustomGriddle')
const GriddleFormattedAmount = require('src/components/shared/GriddleFormattedAmount')

const getNumberColumnMetadata = intl => (
  [{
    columnName: 'spentFinance',
    displayName: intl.formatMessage(financeTypeMessages.spentFinance.adjective)
  }, {
    columnName: 'plannedFinance',
    displayName: intl.formatMessage(financeTypeMessages.plannedFinance.adjective)
  }, {
    columnName: 'difference',
    displayName: intl.formatMessage(financeTypeMessages.difference),
    colorAmounts: true,
    withPlusWhenPositive: true
  }]
  .map(column => {
    column.customComponent = GriddleFormattedAmount
    return column
  })
)

const getColumnMetadata = intl => (
  [{
    columnName: 'year',
    displayName: intl.formatMessage(timePeriodTypeMessages.year.noun)
  }].concat(getNumberColumnMetadata(intl))
)

const getDataForYear = (year, spentFinances, plannedFinances) => {
  const spentFinance = spentFinances.find(f => f.timePeriod === year)
  const plannedFinance = plannedFinances.find(f => f.timePeriod === year)

  return {
    year: translateTimePeriod(year),
    spentFinance: spentFinance ? spentFinance.amount : null,
    plannedFinance: plannedFinance ? plannedFinance.amount : null,
    difference: plannedFinance && spentFinance ? plannedFinance.amount - spentFinance.amount : null
  }
}

const getResults = (state, itemId) => {
  const spentFinances = getItemSpentFinances(state, itemId)
  const plannedFinances = getItemPlannedFinances(state, itemId)

  return getSelectedYears(state).map(year => (
    getDataForYear(year, spentFinances, plannedFinances)
  ))
}

const mapStateToProps = (state, ownProps) => ({
  columns: getColumnMetadata(ownProps.intl).map(column => column.columnName),
  columnMetadata: getColumnMetadata(ownProps.intl),
  results: getResults(state, getDetailsItemId(state)),
  showPager: false,
  tableClassName: 'gb-BudgetItemYearlyTable'
})

module.exports = injectIntl(connect(mapStateToProps)(CustomGriddle))
