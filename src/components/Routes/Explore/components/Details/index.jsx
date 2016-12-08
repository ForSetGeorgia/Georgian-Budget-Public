const React = require('react')
const { injectIntl } = require('react-intl')
const { bool, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getDetailsItem,
  getDetailsItemId
} = require('src/data/ducks/explore')

const BudgetItemDetailsFetcher = require('./components/BudgetItemDetailsFetcher')
const BudgetItem = require('./components/BudgetItem/index')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')

let ExploreDetails = React.createClass({
  propTypes: {
    detailsItemLoaded: bool.isRequired,
    detailsItemId: string.isRequired
  },

  renderContent () {
    const { detailsItemId, detailsItemLoaded } = this.props
    if (detailsItemLoaded) {
      return <BudgetItem id={detailsItemId} />
    } else {
      return <LoadingIndicator />
    }
  },

  render () {
    return (
      <div className='gb-ExploreDetails'>
        <BudgetItemDetailsFetcher />
        {this.renderContent()}
      </div>
    )
  }
})

const mapStateToProps = state => ({
  detailsItemLoaded: !!getDetailsItem(state),
  detailsItemId: getDetailsItemId(state)
})

ExploreDetails = injectIntl(connect(mapStateToProps)(ExploreDetails))

module.exports = ExploreDetails
