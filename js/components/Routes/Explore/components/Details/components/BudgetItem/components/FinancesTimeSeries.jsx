const React = require('react')
const { connect } = require('react-redux')
const { arrayOf, number, shape, string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')

const TimeSeriesChart = require('./TimeSeriesChart')
const timePeriodTypeMessages = require('js/messages/timePeriodTypes')
const { getItemSpentFinances } = require('js/redux/entities/budgetItem')

const FinancesTimeSeries = React.createClass({
  propTypes: {
    itemIds: arrayOf(string).isRequired,
    intl: intlShape.isRequired,
    timePeriodType: string.isRequired,
    spentFinances: arrayOf(arrayOf(shape({
      timePeriod: string.isRequired,
      amount: number.isRequired
    }))),
    plannedFinances: arrayOf(arrayOf(shape({
      timePeriod: string.isRequired,
      amount: number.isRequired
    })))
  },

  getFinanceType () {
    const { spentFinances, plannedFinances } = this.props
    if (spentFinances && plannedFinances) {
      return 'all_finances'
    } else if (spentFinances) {
      return 'spent_finance'
    } else if (plannedFinances) {
      return 'planned_finance'
    }
  },

  render () {
    const { itemIds, intl, timePeriodType, spentFinances } = this.props

    const id = itemIds[0]
    const financeType = this.getFinanceType()

    let finances = spentFinances[0]

    const timePeriods = finances.map(f => f.timePeriod)
    const amounts = finances.map(f => f.amount)

    const timePeriodTypeMessage = intl.formatMessage(
      timePeriodTypeMessages[timePeriodType]
    )

    const timeSeriesChartTitle = `${timePeriodTypeMessage}`

    return (<TimeSeriesChart
      containerId={`${id}-${financeType}-${timePeriodType}-chart`}
      key={`${id}-${financeType}-${timePeriodType}-chart`}
      title={timeSeriesChartTitle}
      xAxisCategories={timePeriods}
      yAxisAmounts={amounts}
    />)
  }
})

const mapStateToProps = (state, ownProps) => {
  const { itemIds, showSpentFinances } = ownProps
  const props = {}

  if (showSpentFinances) {
    props.spentFinances = itemIds.map(
      itemId => getItemSpentFinances(state, itemId)
    )
  }

  return props
}

module.exports = injectIntl(connect(mapStateToProps)(FinancesTimeSeries))
