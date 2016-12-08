const React = require('react')
const { bool, func, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getLocale } = require('src/data/ducks/locale')
const fetchBudgetItemDetails = require('src/data/modules/fetchers/fetchBudgetItemDetails')
const { getDetailsItemId } = require('src/data/ducks/explore')

const {
  getDetailsLoadedForItemCurrentLocale
} = require('src/data/modules/entities/budgetItem')

const BudgetItemDetailsFetcher = React.createClass({
  propTypes: {
    detailsLoaded: bool.isRequired,
    detailsItemId: string.isRequired,
    fetchBudgetItemDetails: func.isRequired
  },

  fetchDetails () {
    const { detailsItemId, detailsLoaded, fetchBudgetItemDetails } = this.props

    if (!detailsLoaded) fetchBudgetItemDetails(detailsItemId)
  },

  componentDidMount () {
    this.fetchDetails()
  },

  render () {
    return null
  }
})

const detailsLoaded = state => (
  getDetailsLoadedForItemCurrentLocale(state, getDetailsItemId(state))
)

const mapStateToProps = state => ({
  detailsLoaded: detailsLoaded(state),
  detailsItemId: getDetailsItemId(state),
  key: `${getDetailsItemId(state)}_${getLocale(state)}`
})

const mapDispatchToProps = dispatch => ({
  fetchBudgetItemDetails: itemId => { dispatch(fetchBudgetItemDetails(itemId)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemDetailsFetcher))
