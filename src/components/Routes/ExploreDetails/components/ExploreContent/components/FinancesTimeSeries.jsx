const Ramda = require('ramda')
const { connect } = require('react-redux')
const { injectIntl, defineMessages } = require('react-intl')
const { uniq, padStart } = require('lodash')

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

const getSpentFinanceSeriesColor = isOfficial => (
  isOfficial ? 'rgb(255, 191, 31)' : 'url(#highchartPattern)'
)

const getSeriesColor = (financeType, isOfficial) => {
  if (financeType === 'plannedFinance') return 'transparent'
  if (financeType === 'spentFinance') {
    return getSpentFinanceSeriesColor(isOfficial)
  }
}

const getPlannedFinanceSeriesBorder = isOfficial => ({
  borderWidth: 2,
  borderColor: 'black',
  dashStyle: isOfficial ? 'solid' : 'dash'
})

const getSeriesOptions = (financeType, isOfficial) => (
  Object.assign(
    {},
    {
      official: isOfficial,
      color: getSeriesColor(financeType, isOfficial)
    },
    financeType === 'plannedFinance' ? getPlannedFinanceSeriesBorder(isOfficial) : {}
  )
)

const getIndividualSeries = ({ intl }, financeType, finances, isOfficial) => (
  Object.assign(
    {},
    {
      name: getSeriesName(intl, financeType, isOfficial),
      data: finances.map(f => ({
        name: translateTimePeriod(f.timePeriod, intl),
        y: f.amount
      })),
      financeType: financeType
    },
    getSeriesOptions(financeType, isOfficial)
  )
)

const getSeriesByType = (ownProps, finances) => {
  // console.log(ownProps, finances, financeType, 'sd')
  const financesData = finances.data
  const financesType = finances.type
  if (!(financesData && financesData.length)) { return [] }

  return financesData
    .reduce((types, item) => {
      types[item.official ? 0 : 1].push(item)
      return types
    }, [[], []])
    .reduce((series, filteredFinances, itemIndex) => {
      if (!(filteredFinances && filteredFinances.length)) { return series }

      series.push(getIndividualSeries(
        ownProps,
        financesType,
        filteredFinances,
        itemIndex === 0
      ))

      return series
    }, [])
}

const getCallbackForMonthTimeSlot = (timeSlots) => {
  const missingTimeSlots = []
  const first = timeSlots[0].replace('y', '').replace('m', '').split('_')
  const last = timeSlots[timeSlots.length - 1].replace('y', '').replace('m', '').split('_')
  // const current = timeSlots.shift().replace('y', '').replace('m', '').split("_")
  const firstYear = parseInt(first[0])
  const firstMonth = parseInt(first[1])
  const lastYear = parseInt(last[0])
  const lastMonth = parseInt(last[1])
  console.log(timeSlots)
  let isEnd = firstYear === lastYear && firstMonth === lastMonth
  let currMonth = firstMonth
  let currYear = firstYear
  while (!isEnd) {
    currMonth = ++currMonth % 13
    if (currMonth === 0) {
      currMonth = 1
    }
    currYear += currMonth === 1 ? 1 : 0
    const currTimeSlot = `y${currYear}_m${padStart(currMonth, 2, '0')}`
    if (timeSlots.indexOf(currTimeSlot) === -1) {
      console.log(currTimeSlot)
      missingTimeSlots.push(currTimeSlot)
    }
    isEnd = currYear === lastYear && currMonth === lastMonth
  }

  // console.log(firstYear, firstMonth, lastYear, lastMonth, missingTimeSlots)
  return 'monthCallback'
}
const getCallbackForQuarterTimeSlot = () => {
  console.log('quarterCallback')
  return 'quarterCallback'
}
const getCallbackForYearTimeSlot = () => {
  console.log('yearCallback')
  return 'yearCallback'
}
const getCallbackForTimeSlotType = (timePeriodType) => {
  if (timePeriodType === 'month') {
    return getCallbackForMonthTimeSlot
  } else if (timePeriodType === 'quarter') {
    return getCallbackForQuarterTimeSlot
  } else if (timePeriodType === 'year') {
    return getCallbackForYearTimeSlot
  }
  return () => {}
}

const getSeriesForMissingTimeSlotByType = (timeSlots, timePeriodTypeCallback) => {
  // console.log(timeSlots, timePeriodTypeCallback)
  return timePeriodTypeCallback(timeSlots)
}

const getSeriesForMissingTimeSlot = ({ timePeriodType }, finances) => {
  // console.log(getCallbackForTimeSlotType(timePeriodType))
  getSeriesForMissingTimeSlotByType(
    uniq(finances.reduce((reducer, finance) => {
      return reducer.concat(finance.data.map((element) => element.timePeriod))
    }, [])).sort(),
    getCallbackForTimeSlotType(timePeriodType)
  )
  return []
}

const getSeriesForBudgetItemId = (state, ownProps, itemId) => {
  const {
    showPlannedFinances,
    showSpentFinances,
    inTimePeriod,
    timePeriodType
  } = ownProps

  const financePreparer = composeFinancePreparer(inTimePeriod, timePeriodType)
  const finances = []
  if (showSpentFinances) {
    finances.push({ data: financePreparer(getItemSpentFinances(state, itemId)), type: 'spentFinance' })
  }
  if (showPlannedFinances) {
    finances.push({ data: financePreparer(getItemPlannedFinances(state, itemId)), type: 'plannedFinance' })
  }
  return finances.reduce((reducer, finance) => {
    return reducer.concat(getSeriesByType(ownProps, finance))
  }, []).concat(getSeriesForMissingTimeSlot(ownProps, finances))
}

const getSeries = (state, ownProps) => {
  const allSeries = ownProps.itemIds.reduce((series, itemId) => {
    return series.concat(...getSeriesForBudgetItemId(state, ownProps, itemId))
  }, [])
  // console.log(allSeries)
  console.log('--------------')
  return allSeries
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
