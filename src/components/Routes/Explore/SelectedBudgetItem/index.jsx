const React = require('react')
const { injectIntl } = require('react-intl')
const { bool, string } = React.PropTypes
const { connect } = require('react-redux')

const BudgetItemDetailsFetcher = require('./BudgetItemDetailsFetcher')
const BudgetItemDetails = require('./BudgetItemDetails')
const BudgetItemHeading = require('./components/BudgetItemHeading')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')

const { getDetailsLoadedForItem } =
require('src/data/modules/entities/budgetItem/loaded')

const {
  getDetailsItem,
  getDetailsItemId
} = require('src/data/ducks/explore')

const BudgetItem = React.createClass({
  propTypes: {
    itemLoaded: bool.isRequired,
    itemId: string.isRequired
  },

  renderContent () {
    if (!this.props.itemLoaded) return <LoadingIndicator />

    return (
      <div>
        <BudgetItemHeading />
        <BudgetItemDetails {...this.props} />
      </div>
    )
  },

  render () {
    return (
      <div className='gb-BudgetItem'>
        <BudgetItemDetailsFetcher itemId={this.props.itemId} />
        {this.renderContent()}
      </div>
    )
  }
})

const mapStateToProps = (state, ownProps) => ({
  itemId: getDetailsItemId(state),
  itemLoaded: !!getDetailsItem(state, getDetailsItemId(state)),
  detailsLoaded: getDetailsLoadedForItem(state, getDetailsItemId(state))
})

module.exports = injectIntl(connect(mapStateToProps)(BudgetItem))
