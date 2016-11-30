const React = require('react')
const { arrayOf, func, number, string } = React.PropTypes
const { connect } = require('react-redux')

const FinancesTimeSeries = require('./components/FinancesTimeSeries')
const LoadingIndicator = require('js/components/shared/LoadingIndicator')

const fetchBudgetItemDetails = require('js/redux/fetchers/fetchBudgetItemDetails')

const BudgetItem = React.createClass({
  propTypes: {
    id: string.isRequired,
    name: string.isRequired,
    loaded: arrayOf(string).isRequired,
    spentFinances: arrayOf(number),
    plannedFinances: arrayOf(number),
    fetchBudgetItemDetails: func
  },

  detailsLoaded () {
    return this.props.loaded.includes('details')
  },

  componentDidMount () {
    if (this.detailsLoaded()) return

    this.props.fetchBudgetItemDetails(this.props.id)
  },

  renderChart (timePeriodType) {
    if (!this.detailsLoaded()) return
    const { id } = this.props

    return (
      <FinancesTimeSeries
        itemIds={[id]}
        timePeriodType={timePeriodType}
        showSpentFinances
        showPlannedFinances
      />
    )
  },

  renderDetails () {
    return (
      <div>
        {this.renderChart('year')}
        {this.renderChart('quarter')}
        {this.renderChart('month')}
      </div>
    )
  },

  render () {
    const { name } = this.props

    let details = ''

    if (this.detailsLoaded()) {
      details = this.renderDetails()
    } else {
      details = <LoadingIndicator />
    }

    return (
      <div className='gb-BudgetItem'>

        <h3 className='gb-BudgetItem-heading'>
          {name}
        </h3>

        {details}

      </div>
    )
  }
})

const mapDispatchToProps = dispatch => ({
  fetchBudgetItemDetails: itemId => {
    dispatch(fetchBudgetItemDetails(itemId))
  }
})

module.exports = connect(null, mapDispatchToProps)(BudgetItem)
