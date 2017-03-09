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

const getSeries = (state, ownProps) => {
  const { intl } = ownProps
  let series = []

  getItems(state, ownProps).forEach(item => {
    if (item.spentFinances && item.spentFinances.length > 0) {
      let spentFinancesByType = [[], []]
      item.spentFinances.forEach((spentFinancesItem)=>{
        spentFinancesByType[spentFinancesItem.official ? 0 : 1].push(spentFinancesItem)
      })
      spentFinancesByType.forEach((spentFinancesByTypeItem, spentFinancesByTypeItem_i) => {
        if(spentFinancesByTypeItem.length) {
          let _name = 'spentFinance'
          let _color = 'rgb(255, 191, 31)'
          if (spentFinancesByTypeItem_i === 1) {
            _name += 'Calculated'
            _color = 'url(#highchartPattern)'
          }

          series.push({
            name: intl.formatMessage(financeTypeMessages[_name].adjective),
            data: spentFinancesByTypeItem.map(f => ({
              name: translateTimePeriod(f.timePeriod, intl),
              y: f.amount
            })),
            color: _color,
            financeType: 'spentFinance'
          })
        }
      })
    }

    if (item.plannedFinances && item.spentFinances.length > 0) {
      let plannedFinancesByType = [[], []]
      item.plannedFinances.forEach((plannedFinancesItem)=>{
        plannedFinancesByType[plannedFinancesItem.official ? 0 : 1].push(plannedFinancesItem)
      })
      plannedFinancesByType.forEach((plannedFinancesByTypeItem, plannedFinancesByTypeItem_i) => {
        if(plannedFinancesByTypeItem.length) {
          let _name = 'plannedFinance'
          let _dashStyle = 'solid'
          if (plannedFinancesByTypeItem_i === 1) {
            _name += 'Calculated'
            _dashStyle = 'dash'
          }

          series.push({
            name: intl.formatMessage(financeTypeMessages[_name].adjective),
            data: plannedFinancesByTypeItem.map(f => ({
              name: translateTimePeriod(f.timePeriod, intl),
              y: f.amount
            })),
            color: 'transparent',
            borderWidth: 2,
            borderColor: 'black',
            dashStyle: _dashStyle,
            financeType: 'plannedFinance'
          })
        }
      })
    }
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
