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

const getItemFinancesObject = (state, ownProps, itemId) => {
  const {
    showSpentFinances,
    showPlannedFinances,
    inTimePeriod,
    timePeriodType
  } = ownProps

  const financePreparer = composeFinancePreparer(inTimePeriod, timePeriodType)

  return Object.assign(
    {},
    { id: itemId },
    !showSpentFinances ? {} : {
      spentFinances: financePreparer(getItemSpentFinances(state, itemId))
    },
    !showPlannedFinances ? {} : {
      plannedFinances: financePreparer(getItemPlannedFinances(state, itemId))
    }
  )
}

const getItems = (state, ownProps) => {
  const { itemIds } = ownProps

  return itemIds.map(itemId => getItemFinancesObject(state, ownProps, itemId))
}

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

const getSeriesName = (intl, financeType, iterator) => {
  if (iterator === 1) {
    return intl.formatMessage(
      financeTypeMessages[`${financeType}Calculated`].adjective
    )
  } else {
    return intl.formatMessage(
      financeTypeMessages[financeType].adjective
    )
  }
}

const getSeriesByType = (intl, finances, name, defaults, options) => {
  // console.log(finances, name, defaults, options);
  let series = []
  if (finances && finances.length > 0) {
    let types = [[], []]

    finances.forEach((item) => {
      types[item.official ? 0 : 1].push(item)
    })

    types.forEach((item, itemIndex) => {
      if (item && item.length > 0) {
        series.push(
          Object.assign(
            {},
            {
              name: getSeriesName(intl, name, itemIndex),
              data: item.map(f => ({
                name: translateTimePeriod(f.timePeriod, intl),
                y: f.amount
              })),
              financeType: name
            },
            defaults,
            options[itemIndex]
          )
        )
      }
    })
  }
  return series
}

const getSeries = (state, ownProps) => {
  const { intl } = ownProps
  let series = []

  getItems(state, ownProps).forEach(item => {
    series = series.concat(
      // spent finances
      getSeriesByType(
        intl,
        item.spentFinances,
        'spentFinance',
        {},
        [
          { official: true, color: 'rgb(255, 191, 31)' },
          { official: false, color: 'url(#highchartPattern)' }
        ]
      ),
      // planned finances
      getSeriesByType(
        intl,
        item.plannedFinances,
        'plannedFinance',
        { color: 'transparent', borderWidth: 2, borderColor: 'black' },
        [
          { official: true, dashStyle: 'solid' },
          { official: false, dashStyle: 'dash' }
        ]
      )
    )
  })
  return series
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
