const React = require('react')
const { array, string, func } = React.PropTypes
const { connect } = require('react-redux')

const FinancesTimeSeries = require('./components/FinancesTimeSeries')

const fetchBudgetItemDetails = require('js/redux/fetchers/fetchBudgetItemDetails')

const BudgetItem = React.createClass({
  propTypes: {
    id: string.isRequired,
    name: string.isRequired,
    financeType: string,
    timePeriodType: string,
    timePeriods: array,
    amounts: array,
    fetchBudgetItemDetails: func
  },

  hasFinanceData () {
    const { id, financeType, timePeriodType, timePeriods, amounts } = this.props

    return (id && financeType && timePeriodType && timePeriods && amounts)
  },

  componentDidMount () {
    if (this.hasFinanceData()) return

    this.props.fetchBudgetItemDetails(this.props.id)
  },

  render () {
    const { id, name, financeType, timePeriodType, timePeriods, amounts } = this.props

    let chart = ''

    if (this.hasFinanceData()) {
      chart = <FinancesTimeSeries
        id={id}
        financeType={financeType}
        timePeriodType={timePeriodType}
        timePeriods={timePeriods}
        amounts={amounts}
      />
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
