const Ramda = require('ramda')
const { connect } = require('react-redux')
const { injectIntl, defineMessages } = require('react-intl')
const uniq = require('lodash.uniq')
const padStart = require('lodash.padstart')

const TimeSeriesChart = require('./TimeSeriesChart')
const timePeriodTypeMessages = require('src/messages/timePeriodTypes')
const appMessages = require('src/messages/app')
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

const getExportSubTitle = (state, ownProps) => {
  const { getLastUpdatedDate } = require('src/data/ducks/explore')
  const { intl } = ownProps

  return `${intl.formatMessage(appMessages.lastUpdated)}: ${getLastUpdatedDate(state)}` // `${intl.formatMessage(timePeriodTypeMessages[].adjective} - ${timePeriodTypeMessage}`
}

const getUniqueChartId = (ownProps) => {
  const { timePeriodType, intl, itemIds } = ownProps

  return `${itemIds.join(',')}-${getFinanceType(ownProps)}-${timePeriodType}-${intl.locale}`
}

const getMissingSeries = ({ intl }, missingTimePeriods, allTimePeriods) => {
  if (missingTimePeriods.length === 0) { return undefined }

  return {
    name: intl.formatMessage(financeTypeMessages.missing),
    data: missingTimePeriods.map(f => ({
      y: 0,
      x: allTimePeriods.indexOf(f)
    })),
    financeType: 'missingFinance',
    color: 'rgb(117, 117, 117)'
  }
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
    {
      official: isOfficial,
      color: getSeriesColor(financeType, isOfficial)
    },
    financeType === 'plannedFinance' ? getPlannedFinanceSeriesBorder(isOfficial) : {}
  )
)

const getIndividualSeries = ({ intl }, financeType, finances, isOfficial, allTimePeriods) => (
  Object.assign(
    {},
    {
      name: getSeriesName(intl, financeType, isOfficial),
      data: finances.map(f => ({
        y: f.amount,
        x: allTimePeriods.indexOf(f.timePeriod)
      })),
      financeType: financeType
    },
    getSeriesOptions(financeType, isOfficial)
  )
)

const getSeriesByType = (ownProps, finances, allTimePeriods) => {
  const { data: financesData, type: financesType } = finances
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
        itemIndex === 0,
        allTimePeriods
      ))

      return series
    }, [])
}

const getCallbackForMonthTimePeriod = (timePeriods) => {
  const missingTimePeriods = []
  const [firstYear, firstMonth] = timePeriods[0].replace('y', '').replace('m', '').split('_').map((m) => parseInt(m))
  const [lastYear, lastMonth] = timePeriods[timePeriods.length - 1].replace('y', '').replace('m', '').split('_').map((m) => parseInt(m))

  let isEnd = firstYear === lastYear && firstMonth === lastMonth
  let [currYear, currMonth] = [firstYear, firstMonth]
  while (!isEnd) {
    currMonth = ++currMonth % 13
    if (currMonth === 0) {
      currMonth = 1
    }
    currYear += currMonth === 1 ? 1 : 0
    let currTimePeriod = `y${currYear}_m${padStart(currMonth, 2, '0')}`
    if (timePeriods.indexOf(currTimePeriod) === -1) {
      missingTimePeriods.push(currTimePeriod)
    }
    isEnd = currYear === lastYear && currMonth === lastMonth
  }
  return missingTimePeriods
}

const getCallbackForQuarterTimePeriod = (timePeriods) => {
  const missingTimePeriods = []
  const [firstYear, firstQuarter] = timePeriods[0].replace('y', '').replace('q', '').split('_').map((m) => parseInt(m))
  const [lastYear, lastQuarter] = timePeriods[timePeriods.length - 1].replace('y', '').replace('q', '').split('_').map((m) => parseInt(m))

  let isEnd = firstYear === lastYear && firstQuarter === lastQuarter
  let [currYear, currQuarter] = [firstYear, firstQuarter]

  while (!isEnd) {
    currQuarter = ++currQuarter % 5
    if (currQuarter === 0) {
      currQuarter = 1
    }
    currYear += currQuarter === 1 ? 1 : 0
    let currTimePeriod = `y${currYear}_q${currQuarter}`
    if (timePeriods.indexOf(currTimePeriod) === -1) {
      missingTimePeriods.push(currTimePeriod)
    }
    isEnd = currYear === lastYear && currQuarter === lastQuarter
  }
  return missingTimePeriods
}

const getCallbackForYearTimePeriod = (timePeriods) => {
  const missingTimePeriods = []
  const firstYear = parseInt(timePeriods[0].replace('y', ''))
  const lastYear = parseInt(timePeriods[timePeriods.length - 1].replace('y', ''))
  let isEnd = firstYear === lastYear
  let [currYear] = [firstYear]

  while (!isEnd) {
    ++currYear
    let currTimePeriod = `y${currYear}`
    if (timePeriods.indexOf(currTimePeriod) === -1) {
      missingTimePeriods.push(currTimePeriod)
    }
    isEnd = currYear === lastYear
  }
  return missingTimePeriods
}

const getCallbackForTimePeriodType = (timePeriodType) => {
  if (timePeriodType === 'month') {
    return getCallbackForMonthTimePeriod
  } else if (timePeriodType === 'quarter') {
    return getCallbackForQuarterTimePeriod
  } else if (timePeriodType === 'year') {
    return getCallbackForYearTimePeriod
  }
  return () => {}
}

const getMissingTimePeriodsByType = (timePeriods, timePeriodTypeCallback) => {
  return timePeriodTypeCallback(timePeriods)
}

const getCategorySpecifications = ({ timePeriodType, intl }, finances) => {
  const existingTimePeriods = uniq(finances.reduce((reducer, finance) => {
    return reducer.concat(finance.data.map((element) => element.timePeriod))
  }, [])).sort()

  const missingTimePeriods = getMissingTimePeriodsByType(
    existingTimePeriods,
    getCallbackForTimePeriodType(timePeriodType)
  )

  const fullSetOfTimePeriods = existingTimePeriods.concat(missingTimePeriods).sort()

  return [missingTimePeriods, fullSetOfTimePeriods, fullSetOfTimePeriods.map((m) => translateTimePeriod(m, intl))]
}

const getFinancesForBudgetItemId = (state, ownProps, itemId) => {
  const {
    showPlannedFinances,
    showSpentFinances,
    inTimePeriod,
    timePeriodType
  } = ownProps

  const financePreparer = composeFinancePreparer(inTimePeriod, timePeriodType)

  return [].concat(
    showSpentFinances ? { data: financePreparer(getItemSpentFinances(state, itemId)), type: 'spentFinance' } : {},
    showPlannedFinances ? { data: financePreparer(getItemPlannedFinances(state, itemId)), type: 'plannedFinance' } : {}
  )
}

const getCategoriesAndSeries = (state, ownProps) => {
  const allFinances = ownProps.itemIds.reduce((reducer, itemId) => {
    return reducer.concat(getFinancesForBudgetItemId(state, ownProps, itemId))
  }, [])

  const [missingTimePeriods, allTimePeriods, allTimePeriodNames] = getCategorySpecifications(ownProps, allFinances)

  return {
    categories: allTimePeriodNames,
    series: allFinances
      .reduce((reducer, finance) => {
        return reducer.concat(getSeriesByType(ownProps, finance, allTimePeriods))
      }, [])
      .concat(getMissingSeries(ownProps, missingTimePeriods, allTimePeriods))
      .filter((f) => typeof f !== 'undefined')
  }
}
const mapStateToProps = (state, ownProps) => {
  const { intl } = ownProps
  return Object.assign(
    {
      className: 'gb-FinanceTimeSeries',
      exportTitle: getExportTitle(state, ownProps),
      exportSubTitle: getExportSubTitle(state, ownProps),
      intl,
      key: getUniqueChartId(ownProps),
      uniqueChartId: getUniqueChartId(ownProps),
      valueSuffix: intl.formatMessage(messages.valueSuffix),
      yAxisTitle: intl.formatMessage(messages.yAxisTitle)
    },
    getCategoriesAndSeries(state, ownProps)
  )
}

const FinanceTimeSeries = injectIntl(connect(mapStateToProps)(TimeSeriesChart))

module.exports = FinanceTimeSeries
