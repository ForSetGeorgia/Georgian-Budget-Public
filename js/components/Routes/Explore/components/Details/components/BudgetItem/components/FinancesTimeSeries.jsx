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

  render () {
    const {
      itemIds,
      intl,
      timePeriodType,
      spentFinanceArrays,
      plannedFinanceArrays
    } = this.props

    const id = itemIds[0]
    const financeType = this.getFinanceType()

    const timePeriods = spentFinanceArrays[0].map(f => f.timePeriod)

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

    const timePeriodTypeMessage = intl.formatMessage(
      timePeriodTypeMessages[timePeriodType]
    )

    const timeSeriesChartTitle = `${timePeriodTypeMessage}`

    return (
      <TimeSeriesChart
        containerId={`${id}-${financeType}-${timePeriodType}-chart`}
        key={`${id}-${financeType}-${timePeriodType}-chart`}
        title={timeSeriesChartTitle}
        xAxisCategories={timePeriods}
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
