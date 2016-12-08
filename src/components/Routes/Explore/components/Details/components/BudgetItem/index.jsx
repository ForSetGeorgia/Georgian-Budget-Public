const React = require('react')
const { injectIntl } = require('react-intl')
const { string, bool } = React.PropTypes
const { connect } = require('react-redux')

const BudgetItemHeading = require('./components/BudgetItemHeading')
const BudgetItemCharts = require('./components/BudgetItemCharts')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')
const ItemDetailsLink = require('./components/ItemDetailsLink')
const ParentListLink = require('./components/ParentListLink')

const { getSelectedTimePeriods } = require('src/data/ducks/filters')

const {
  getBudgetItemName,
  getDetailsLoadedForItem,
  getOverallBudgetIdForItem,
  getChildProgramIdsForItem
} = require('src/data/modules/entities/budgetItem')

const BudgetItem = React.createClass({
  propTypes: {
    detailsLoaded: bool.isRequired,
    id: string.isRequired,
    name: string.isRequired,
    overallBudgetId: string,
    selectedTimePeriod: string,
    hasChildPrograms: bool.isRequired
  },

  renderOverallBudgetLink () {
    const { overallBudgetId } = this.props

    return overallBudgetId ? (
      <ItemDetailsLink itemId={overallBudgetId} />
    ) : null
  },

  renderViewProgramsLink () {
    const { id, hasChildPrograms } = this.props

    if (!hasChildPrograms) return

    return (
      <ParentListLink parentItemId={id} budgetItemType='program' />
    )
  },

  renderDetails () {
    const { id, selectedTimePeriod, detailsLoaded } = this.props

    if (!detailsLoaded) return <LoadingIndicator />

    return (
      <div>
        <BudgetItemCharts {...{ id, selectedTimePeriod }} />
        <BudgetItemYearlyTable itemId={id} />
        {this.renderOverallBudgetLink()}
        <br />
        {this.renderViewProgramsLink()}
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

const mapStateToProps = (state, ownProps) => ({
  detailsLoaded: getDetailsLoadedForItem(state, ownProps.id),
  name: getBudgetItemName(state, ownProps.id),
  selectedTimePeriod: getSelectedTimePeriods(state)[0],
  overallBudgetId: getOverallBudgetIdForItem(state, ownProps.id),
  hasChildPrograms: getChildProgramIdsForItem(state, ownProps.id).length !== 0
})

module.exports = injectIntl(connect(mapStateToProps, null)(BudgetItem))
