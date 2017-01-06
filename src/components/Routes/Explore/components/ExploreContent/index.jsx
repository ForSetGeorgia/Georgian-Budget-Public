const React = require('react')
const { injectIntl } = require('react-intl')
const { bool } = React.PropTypes
const { connect } = require('react-redux')

const BudgetItemDetailsFetcher = require('./components/BudgetItemDetailsFetcher')
const BudgetItemHeading = require('./components/BudgetItemHeading')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const TimePeriodSelect = require('./components/TimePeriodSelect')
const TimePeriodTypeSelect = require('./components/TimePeriodTypeSelect')
const SelectedFinanceTimeSeries = require('./components/SelectedFinanceTimeSeries')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')
const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
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

        <div className='gb-BudgetItem-selectListHeader'>
          <h3>
            Select List Name
          </h3>

          <div className='gb-BudgetItem-selectListHeader-controls'>
            <BudgetItemTypeSelect />

            <div className='gb-BudgetItem-selectListHeader-controls-row2'>
              <FinanceTypeSelect />
              <TimePeriodSelect />
            </div>
          </div>
        </div>

        <BudgetItemSelectLists />
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
