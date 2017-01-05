const React = require('react')
const { injectIntl } = require('react-intl')
const { bool } = React.PropTypes
const { connect } = require('react-redux')

const BudgetItemDetailsFetcher = require('./components/BudgetItemDetailsFetcher')
const BudgetItemHeading = require('./components/BudgetItemHeading')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemCharts = require('./components/BudgetItemCharts')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')
const BudgetItemSelectLists = require('./components/BudgetItemSelectLists/index')
const OverallBudgetLink = require('./components/OverallBudgetLink')
const AgencyLink = require('./components/AgencyLink')
const ParentProgramLink = require('./components/ParentProgramLink')

const { getDetailsLoadedForItem } =
require('src/data/modules/entities/budgetItem/loaded')

const {
  getDetailsItem,
  getDetailsItemId
} = require('src/data/ducks/explore')

const BudgetItem = React.createClass({
  propTypes: {
    detailsLoaded: bool.isRequired,
    itemLoaded: bool.isRequired
  },

  renderDetails () {
    const { detailsLoaded } = this.props

    if (!detailsLoaded) return <LoadingIndicator />

    return (
      <div>
        <BudgetItemCharts />

        <BudgetItemYearlyTable />

        <OverallBudgetLink />
        <AgencyLink />
        <ParentProgramLink />

        <BudgetItemSelectLists />
      </div>
    )
  },

  renderContent () {
    if (!this.props.itemLoaded) return <LoadingIndicator />

    return (
      <div>
        <BudgetItemHeading />
        {this.renderDetails()}
      </div>
    )
  },

  render () {
    return (
      <div className='gb-BudgetItem'>
        <BudgetItemDetailsFetcher />
        {this.renderContent()}
      </div>
    )
  }
})

const mapStateToProps = (state, ownProps) => ({
  itemLoaded: !!getDetailsItem(state, getDetailsItemId(state)),
  detailsLoaded: getDetailsLoadedForItem(state, getDetailsItemId(state))
})

module.exports = injectIntl(connect(mapStateToProps)(BudgetItem))
