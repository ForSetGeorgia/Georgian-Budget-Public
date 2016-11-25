const React = require('react')
const { arrayOf, func, number, string } = React.PropTypes
const { connect } = require('react-redux')

const FinancesTimeSeries = require('./components/FinancesTimeSeries')

const fetchBudgetItemDetails = require('js/redux/fetchers/fetchBudgetItemDetails')

const BudgetItem = React.createClass({
  propTypes: {
    id: string.isRequired,
    name: string.isRequired,
    spentFinances: arrayOf(number),
    plannedFinances: arrayOf(number),
    fetchBudgetItemDetails: func
  },

  hasFinanceData () {
    return (this.props.spentFinances && this.props.plannedFinances)
  },

  componentDidMount () {
    if (this.hasFinanceData()) return

    this.props.fetchBudgetItemDetails(this.props.id)
  },

  render () {
    const { id, name } = this.props

    let chart = ''

    if (this.hasFinanceData()) {
      chart = (
        <div>
          <FinancesTimeSeries
            itemIds={[id]}
            timePeriodType='quarter'
            showSpentFinances
            showPlannedFinances
          />
          <FinancesTimeSeries
            itemIds={[id]}
            timePeriodType='year'
            showSpentFinances
            showPlannedFinances
          />
        </div>
      )
    }

    return (
      <div className='gb-BudgetItem'>

        <h3 className='gb-BudgetItem-heading'>
          {name}
        </h3>

        {chart}

      </div>
    )
  }
})

const mapDispatchToProps = (dispatch) => ({
  fetchBudgetItemDetails: itemId => dispatch(fetchBudgetItemDetails(itemId))
})

module.exports = connect(null, mapDispatchToProps)(BudgetItem)
