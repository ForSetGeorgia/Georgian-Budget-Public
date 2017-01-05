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

const {
  filterFinancesByPeriodType,
  selectInTimePeriod
} = require('src/data/modules/entities/finance')

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
          color: 'rgb(255, 191, 31)'
        })
      }

      if (item.plannedFinances && item.plannedFinances.length > 0) {
        series = series.concat({
          name: intl.formatMessage(financeTypeMessages.plannedFinance.adjective),
          data: item.plannedFinances.map(f => f.amount),
          color: 'transparent',
          borderWidth: 2,
          borderColor: 'black'
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
        containerId={this.uniqueChartId()}
        key={`${this.uniqueChartId()}-${this.props.exportTitle}`}
        title={this.title()}
        exportTitle={this.props.exportTitle}
        xAxisCategories={this.timePeriods()}
        series={this.series()}
        valueSuffix={this.valueSuffix()}
        yAxisTitle={this.yAxisTitle()}
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

const getFinances = (state, ownProps, financeGetter, itemId) => {
  const { timePeriodType, inTimePeriod } = ownProps

  let finances = filterFinancesByPeriodType(
    financeGetter(state, itemId), timePeriodType
  )

  finances = finances.sort((f1, f2) => (
    (new Date(f1.startDate)) - (new Date(f2.startDate))
  ))

  if (inTimePeriod && inTimePeriod !== 'all') {
    finances = selectInTimePeriod(finances, inTimePeriod)
  }

  return finances
}

const getItemFinancesObject = (state, ownProps, itemId) => {
  const {
    showSpentFinances,
    showPlannedFinances
  } = ownProps

  const obj = { id: itemId }

  if (showSpentFinances) {
    obj.spentFinances = getFinances(state, ownProps, getItemSpentFinances, itemId)
  }

  if (showPlannedFinances) {
    obj.plannedFinances = getFinances(state, ownProps, getItemPlannedFinances, itemId)
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