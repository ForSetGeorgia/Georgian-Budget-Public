const React = require('react')
const { connect } = require('react-redux')
const { arrayOf, number, shape, string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')

const TimeSeriesChart = require('./TimeSeriesChart')
const timePeriodTypeMessages = require('js/messages/timePeriodTypes')
const financeTypeMessages = require('js/messages/financeTypes')
const { getItemSpentFinances } = require('js/redux/entities/budgetItem')
const { getItemPlannedFinances } = require('js/redux/entities/budgetItem')

const {
  filterFinancesByPeriodType,
  selectInTimePeriod
} = require('js/redux/entities/finance')

const { translateTimePeriod } = require('js/redux/entities/timePeriod')

const FinancesTimeSeries = React.createClass({
  propTypes: {
    intl: intlShape.isRequired,
    timePeriodType: string.isRequired,
    financeType: string.isRequired,
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

    return intl.formatMessage(timePeriodTypeMessages[timePeriodType])
  },

  title () {
    return this.timePeriodTypeMessage()
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
          name: intl.formatMessage(financeTypeMessages.spentFinance.other),
          data: item.spentFinances.map(f => f.amount)
        })
      }

      if (item.plannedFinances && item.plannedFinances.length > 0) {
        series = series.concat({
          name: intl.formatMessage(financeTypeMessages.plannedFinance.other),
          data: item.plannedFinances.map(f => f.amount)
        })
      }
    })

    return series
  },

  render () {
    return (
      <TimeSeriesChart
        containerId={this.uniqueChartId()}
        key={this.uniqueChartId()}
        title={this.title()}
        xAxisCategories={this.timePeriods()}
        series={this.series()}
        currencyName={'lari'}
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

  let typeFiltered = filterFinancesByPeriodType(
    financeGetter(state, itemId), timePeriodType
  )

  if (inTimePeriod && inTimePeriod !== 'all') {
    typeFiltered = selectInTimePeriod(typeFiltered, inTimePeriod)
  }

  return typeFiltered
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

const mapStateToProps = (state, ownProps) => ({
  financeType: getFinanceType(ownProps),
  items: getItems(state, ownProps)
})

module.exports = injectIntl(connect(mapStateToProps)(FinancesTimeSeries))
