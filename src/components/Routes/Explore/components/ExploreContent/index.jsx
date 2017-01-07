const React = require('react')
const { injectIntl } = require('react-intl')
const { bool } = React.PropTypes
const { connect } = require('react-redux')

const BudgetItemDetailsFetcher = require('./components/BudgetItemDetailsFetcher')
const BudgetItemHeading = require('./components/BudgetItemHeading')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const TimePeriodSelect = require('src/components/shared/TimePeriodSelect')
const TimePeriodTypeSelect = require('./components/TimePeriodTypeSelect')
const SelectedFinanceTimeSeries = require('./components/SelectedFinanceTimeSeries')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')
const RelatedItemsList = require('./components/RelatedItemsList/index')
const OverallBudgetLink = require('./components/OverallBudgetLink')
const AgencyLink = require('./components/AgencyLink')
const ParentProgramLink = require('./components/ParentProgramLink')

const { getDetailsLoadedForItem } =
require('src/data/modules/entities/budgetItem/loaded')

const {
  getDetailsItem,
  getDetailsItemId
} = require('src/data/ducks/explore')

const ExploreContent = React.createClass({
  propTypes: {
    detailsLoaded: bool.isRequired,
    itemLoaded: bool.isRequired
  },

  renderDetails () {
    const { detailsLoaded } = this.props

    if (!detailsLoaded) return <LoadingIndicator />

    return (
      <div>
        <SelectedFinanceTimeSeries />

        <BudgetItemYearlyTable />

        <AgencyLink />
        <ParentProgramLink />

        <RelatedItemsList />
      </div>
    )
  },

  renderMainContent () {
    return (
      <div className='gb-BudgetItem-mainContent'>
        <div className='gb-BudgetItem-mainContent-topRow'>
          <BudgetItemHeading />
          <div className='gb-BudgetItem-mainContent-topRow-controls'>
            <TimePeriodTypeSelect />
            <TimePeriodSelect />
          </div>
        </div>

        {this.renderDetails()}
      </div>
    )
  },

  renderContent () {
    if (!this.props.itemLoaded) return <LoadingIndicator />

    return (
      <div>
        <OverallBudgetLink />
        {this.renderMainContent()}
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

module.exports = injectIntl(connect(mapStateToProps)(ExploreContent))
