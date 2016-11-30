const React = require('react')
const { arrayOf, func, string } = React.PropTypes
const { connect } = require('react-redux')

const BudgetItemHeading = require('./components/BudgetItemHeading')
const FinancesTimeSeries = require('./components/FinancesTimeSeries')
const LoadingIndicator = require('js/components/shared/LoadingIndicator')

const fetchBudgetItemDetails = require('js/redux/fetchers/fetchBudgetItemDetails')
const { getSelectedTimePeriods } = require('js/redux/ducks/filters')

const BudgetItem = React.createClass({
  propTypes: {
    id: string.isRequired,
    name: string.isRequired,
    loaded: arrayOf(string).isRequired,
    selectedTimePeriod: string,
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
    const { id, selectedTimePeriod } = this.props

    const surroundingTimePeriod = timePeriodType === 'year' ? 'all' : selectedTimePeriod

    return (
      <FinancesTimeSeries
        key={`${timePeriodType}-${selectedTimePeriod}`}
        itemIds={[id]}
        timePeriodType={timePeriodType}
        showSpentFinances
        showPlannedFinances
        inTimePeriod={surroundingTimePeriod}
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
    const { name, selectedTimePeriod } = this.props

    let details = ''

    if (this.detailsLoaded()) {
      details = this.renderDetails()
    } else {
      details = <LoadingIndicator />
    }

    return (
      <div className='gb-BudgetItem'>
        <BudgetItemHeading name={name} timePeriod={selectedTimePeriod} />

        {details}

      </div>
    )
  }
})

const mapStateToProps = state => ({
  selectedTimePeriod: getSelectedTimePeriods(state)[0]
})

const mapDispatchToProps = dispatch => ({
  fetchBudgetItemDetails: itemId => {
    dispatch(fetchBudgetItemDetails(itemId))
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetItem)
