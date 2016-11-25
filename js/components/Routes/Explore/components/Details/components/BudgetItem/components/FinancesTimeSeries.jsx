const React = require('react')
const { connect } = require('react-redux')
const { arrayOf, number, shape, string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')

const TimeSeriesChart = require('./TimeSeriesChart')
const timePeriodTypeMessages = require('js/messages/timePeriodTypes')
const { getItemSpentFinances } = require('js/redux/entities/budgetItem')
const { getItemPlannedFinances } = require('js/redux/entities/budgetItem')
const { filterFinancesByPeriodType } = require('js/redux/entities/finance')

const FinancesTimeSeries = React.createClass({
  propTypes: {
    itemIds: arrayOf(string).isRequired,
    intl: intlShape.isRequired,
    timePeriodType: string.isRequired,
    spentFinanceArrays: arrayOf(arrayOf(shape({
      timePeriod: string.isRequired,
      amount: number.isRequired
    }))),
    plannedFinanceArrays: arrayOf(arrayOf(shape({
      timePeriod: string.isRequired,
      amount: number.isRequired
    })))
  },

  getFinanceType () {
    const { spentFinanceArrays, plannedFinanceArrays } = this.props
    if (spentFinanceArrays && plannedFinanceArrays) {
      return 'all_finances'
    } else if (spentFinanceArrays) {
      return 'spent_finance'
    } else if (plannedFinanceArrays) {
      return 'planned_finance'
    }
  },

  timePeriodTypeMessage () {
    const { intl, timePeriodType } = this.props
    return intl.formatMessage(timePeriodTypeMessages[timePeriodType])
  },

  title () {
    return this.timePeriodTypeMessage()
  },

  uniqueChartId () {
    const { itemIds, timePeriodType } = this.props

    const financeType = this.getFinanceType()

    return `${itemIds.join(',')}-${financeType}-${timePeriodType}-chart`
  },

  timePeriods () {
    const { spentFinanceArrays } = this.props
    return spentFinanceArrays[0].map(f => f.timePeriod)
  },

  render () {
    const {
      spentFinanceArrays,
      plannedFinanceArrays
    } = this.props

    let financeArrays = []

    if (spentFinanceArrays !== undefined && spentFinanceArrays.length > 0) {
      financeArrays = financeArrays.concat(spentFinanceArrays)
    }

    if (plannedFinanceArrays !== undefined && plannedFinanceArrays.length > 0) {
      financeArrays = financeArrays.concat(plannedFinanceArrays)
    }

    const amountArrays = financeArrays.map(
      finances => finances.map(f => f.amount)
    )

    return (
      <TimeSeriesChart
        containerId={this.uniqueChartId()}
        key={this.uniqueChartId()}
        title={this.title()}
        xAxisCategories={this.timePeriods()}
        yAxisDataArrays={amountArrays}
      />
    )
  }
})

const mapStateToProps = (state, ownProps) => {
  const {
    itemIds,
    showSpentFinances,
    showPlannedFinances,
    timePeriodType
  } = ownProps

  const props = {}

  if (showSpentFinances) {
    props.spentFinanceArrays = itemIds.map(
      itemId => filterFinancesByPeriodType(
        getItemSpentFinances(state, itemId), timePeriodType
      )
    )
  }

  if (showPlannedFinances) {
    props.plannedFinanceArrays = itemIds.map(
      itemId => filterFinancesByPeriodType(
        getItemPlannedFinances(state, itemId), timePeriodType
      )
    )
  }

  return props
}

module.exports = injectIntl(connect(mapStateToProps)(FinancesTimeSeries))
