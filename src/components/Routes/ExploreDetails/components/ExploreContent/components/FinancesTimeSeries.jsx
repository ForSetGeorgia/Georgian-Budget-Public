const Ramda = require('ramda')
const { connect } = require('react-redux')
const { injectIntl, defineMessages } = require('react-intl')

const TimeSeriesChart = require('./TimeSeriesChart')
const timePeriodTypeMessages = require('src/messages/timePeriodTypes')
const financeTypeMessages = require('src/messages/financeTypes')
const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')
const { getItemSpentFinances } = require('src/data/modules/entities/spentFinance')
const { getItemPlannedFinances } = require('src/data/modules/entities/plannedFinance')
const sortByStartDate = require('src/data/modules/timePeriod/sortByStartDate')

const filterByTimePeriodType =
require('src/data/modules/timePeriod/filterByTimePeriodType')

const filterByTimePeriod =
require('src/data/modules/timePeriod/filterByTimePeriod')

const { translateTimePeriod } = require('src/data/modules/timePeriod/translate')

const messages = defineMessages({
  valueSuffix: {
    id: 'app.financeTimeSeries.valueSuffix',
    defaultMessage: 'lari'
  },
  yAxisTitle: {
    id: 'app.financeTimeSeries.yAxisTitle',
    defaultMessage: 'Lari'
  }
})

const getFinanceType = ({ showSpentFinances, showPlannedFinances }) => {
  if (showSpentFinances && showPlannedFinances) {
    return 'allFinance'
  } else if (showSpentFinances) {
    return 'spentFinance'
  } else if (showPlannedFinances) {
    return 'plannedFinance'
  }
}

const composeFinancePreparer = (inTimePeriod, timePeriodType) => (
  Ramda.compose(
    sortByStartDate,
    filterByTimePeriod(inTimePeriod),
    filterByTimePeriodType(timePeriodType)
  )
)

const getExportTitle = (state, ownProps) => {
  const { intl, itemIds, timePeriodType } = ownProps
  const timePeriodTypeMessage = intl.formatMessage(
    timePeriodTypeMessages[timePeriodType].adjective)

  const names = itemIds.map(itemId => getBudgetItemName(state, itemId))

  return `${names.join(' | ')} - ${timePeriodTypeMessage}`
}

const getUniqueChartId = (ownProps) => {
  const { timePeriodType, intl, itemIds } = ownProps

  return `${itemIds.join(',')}-${getFinanceType(ownProps)}-${timePeriodType}-${intl.locale}`
}

const getFinanceTypeIntlMessage = (financeType, isOfficial) => (
  `${financeType}${isOfficial ? '' : 'Calculated'}`
)

const getSeriesName = (intl, financeType, isOfficial) => {
  return intl.formatMessage(
    financeTypeMessages[getFinanceTypeIntlMessage(financeType, isOfficial)].adjective
  )
}

const getIndividualSeries = ({ intl }, financeType, finances, isOfficial, defaults, options) => (
  Object.assign(
    {
      name: getSeriesName(intl, financeType, isOfficial),
      data: finances.map(f => ({
        name: translateTimePeriod(f.timePeriod, intl),
        y: f.amount
      })),
      financeType: financeType
    },
    defaults,
    options
  )
)

const getSeriesByType = (ownProps, finances, financeType, defaults, options) => {
  if (!(finances && finances.length)) { return [] }

  return finances
    .reduce((types, item) => {
      types[item.official ? 0 : 1].push(item)
      return types
    }, [[], []])
    .reduce((series, item, itemIndex) => {
      if (!(item && item.length)) { return series }

      series.push(getIndividualSeries(
        ownProps,
        financeType,
        finances,
        itemIndex === 0,
        defaults,
        options[itemIndex]
      ))

      return series
    }, [])
}

const getSeriesForBudgetItemId = (state, ownProps, itemId) => {
  const {
    showPlannedFinances,
    showSpentFinances,
    inTimePeriod,
    timePeriodType
  } = ownProps

  const financePreparer = composeFinancePreparer(inTimePeriod, timePeriodType)

  return [].concat(
    !showSpentFinances ? [] : getSeriesByType(
      ownProps,
      financePreparer(getItemSpentFinances(state, itemId)),
      'spentFinance',
      {},
      [
        { official: true, color: 'rgb(255, 191, 31)' },
        { official: false, color: 'url(#highchartPattern)' }
      ]
    ),
    !showPlannedFinances ? [] : getSeriesByType(
      ownProps,
      financePreparer(getItemPlannedFinances(state, itemId)),
      'plannedFinance',
      { color: 'transparent', borderWidth: 2, borderColor: 'black' },
      [
        { official: true, dashStyle: 'solid' },
        { official: false, dashStyle: 'dash' }
      ]
    )
  )
}

const getSeries = (state, ownProps) => {
  return ownProps.itemIds.reduce((allSeries, itemId) => {
    return allSeries.concat(...getSeriesForBudgetItemId(state, ownProps, itemId))
  }, [])
}

const mapStateToProps = (state, ownProps) => {
  const { intl } = ownProps

  return {
    className: 'gb-FinanceTimeSeries',
    exportTitle: getExportTitle(state, ownProps),
    intl,
    key: getUniqueChartId(ownProps),
    series: getSeries(state, ownProps),
    uniqueChartId: getUniqueChartId(ownProps),
    valueSuffix: intl.formatMessage(messages.valueSuffix),
    yAxisTitle: intl.formatMessage(messages.yAxisTitle)
  }
}

const FinanceTimeSeries = injectIntl(connect(mapStateToProps)(TimeSeriesChart))

module.exports = FinanceTimeSeries
