const React = require('react')
const { connect } = require('react-redux')
const { arrayOf, number, shape, string } = React.PropTypes
const { injectIntl, intlShape, defineMessages } = require('react-intl')

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

const FinancesTimeSeries = React.createClass({
  propTypes: {
    intl: intlShape.isRequired,
    timePeriodType: string.isRequired,
    financeType: string.isRequired,
    exportTitle: string.isRequired,
    items: arrayOf(shape({
      id: string.isRequired,
      spentFinances: arrayOf(shape({
        timePeriod: string.isRequired,
        amount: number.isRequired
      })),
      plannedFinances: arrayOf(shape({
        timePeriod: string.isRequired,
        amount: number.isRequired
      }))
    }))
  },

  timePeriodTypeMessage () {
    const { intl, timePeriodType } = this.props

    return intl.formatMessage(timePeriodTypeMessages[timePeriodType].adjective)
  },

  title () {
    return null
  },

  uniqueChartId () {
    const { items, timePeriodType, financeType, intl } = this.props
    const itemIds = items.map(item => item.id)

    return `${itemIds.join(',')}-${financeType}-${timePeriodType}-${intl.locale}`
  },

  timePeriods () {
    const { items, intl } = this.props

    return items[0].spentFinances.map(f => translateTimePeriod(f.timePeriod, intl))
  },

  series () {
    const { intl, items } = this.props

    let series = []

    items.forEach(item => {
      if (item.spentFinances && item.spentFinances.length > 0) {
        series = series.concat({
          name: intl.formatMessage(financeTypeMessages.spentFinance.adjective),
          data: item.spentFinances.map(f => f.amount),
          color: 'rgb(255, 191, 31)',
          financeType: 'spentFinance'
        })
      }

      if (item.plannedFinances && item.plannedFinances.length > 0) {
        series = series.concat({
          name: intl.formatMessage(financeTypeMessages.plannedFinance.adjective),
          data: item.plannedFinances.map(f => f.amount),
          color: 'transparent',
          borderWidth: 2,
          borderColor: 'black',
          financeType: 'plannedFinance'
        })
      }
    })

    return series
  },

  valueSuffix () {
    const { intl } = this.props
    return intl.formatMessage(messages.valueSuffix)
  },

  yAxisTitle () {
    const { intl } = this.props
    return intl.formatMessage(messages.yAxisTitle)
  },

  render () {
    return (
      <TimeSeriesChart
        intl={this.props.intl}
        containerId={this.uniqueChartId()}
        key={`${this.uniqueChartId()}-${this.props.exportTitle}`}
        title={this.title()}
        exportTitle={this.props.exportTitle}
        xAxisCategories={this.timePeriods()}
        series={this.series()}
        valueSuffix={this.valueSuffix()}
        yAxisTitle={this.yAxisTitle()}
        className={'gb-FinanceTimeSeries'}
      />
    )
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

const getFinances = (state, ownProps, finances, itemId) => {
  const { timePeriodType, inTimePeriod } = ownProps

  const filterBySelectedTimePeriodType = filterByTimePeriodType(timePeriodType)

  const filterBySelectedTimePeriod = filterByTimePeriod(inTimePeriod)

  if (inTimePeriod && inTimePeriod !== 'all') {
    return filterBySelectedTimePeriod(
      sortByStartDate(filterBySelectedTimePeriodType(finances))
    )
  } else {
    return sortByStartDate(filterBySelectedTimePeriodType(finances))
  }
}

const getItemFinancesObject = (state, ownProps, itemId) => {
  const { showSpentFinances, showPlannedFinances } = ownProps

  const obj = {
    id: itemId
  }

  if (showSpentFinances) {
    obj.spentFinances = getFinances(
      state,
      ownProps,
      getItemSpentFinances(state, itemId),
      itemId
    )
  }

  if (showPlannedFinances) {
    obj.plannedFinances = getFinances(
      state,
      ownProps,
      getItemPlannedFinances(state, itemId),
      itemId
    )
  }

  return obj
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

const mapStateToProps = (state, ownProps) => ({
  financeType: getFinanceType(ownProps),
  items: getItems(state, ownProps),
  exportTitle: getExportTitle(state, ownProps)
})

module.exports = injectIntl(connect(mapStateToProps)(FinancesTimeSeries))
