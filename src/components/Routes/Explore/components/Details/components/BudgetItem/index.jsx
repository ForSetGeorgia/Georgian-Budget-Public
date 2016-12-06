const React = require('react')
const { injectIntl } = require('react-intl')
const { string, bool } = React.PropTypes
const { connect } = require('react-redux')

const BudgetItemHeading = require('./components/BudgetItemHeading')
const BudgetItemCharts = require('./components/BudgetItemCharts')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')

const { getSelectedTimePeriods } = require('src/data/ducks/filters')

const {
  getBudgetItemName,
  getBudgetItemLoaded
} = require('src/data/modules/entities/budgetItem')

const BudgetItem = React.createClass({
  propTypes: {
    detailsLoaded: bool.isRequired,
    id: string.isRequired,
    name: string.isRequired,
    selectedTimePeriod: string
  },

  renderDetails () {
    const { id, selectedTimePeriod, detailsLoaded } = this.props

    if (!detailsLoaded) return <LoadingIndicator />

    return (
      <div>
        <BudgetItemCharts {...{ id, selectedTimePeriod }} />
        <BudgetItemYearlyTable itemId={id} />
      </div>
    )
  },

  render () {
    const { name, selectedTimePeriod } = this.props

    return (
      <div className='gb-BudgetItem'>
        <BudgetItemHeading name={name} timePeriod={selectedTimePeriod} />
        {this.renderDetails()}
      </div>
    )
  }
})

const getDetailsLoaded = (state, itemId) => (
  getBudgetItemLoaded(state, itemId).includes('details')
)

const mapStateToProps = (state, ownProps) => ({
  detailsLoaded: getDetailsLoaded(state, ownProps.id),
  name: getBudgetItemName(state, ownProps.id) || '',
  selectedTimePeriod: getSelectedTimePeriods(state)[0]
})

module.exports = injectIntl(connect(mapStateToProps, null)(BudgetItem))
