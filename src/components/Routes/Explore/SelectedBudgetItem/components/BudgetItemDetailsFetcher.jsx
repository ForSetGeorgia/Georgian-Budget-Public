const React = require('react')
const { bool, func, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getLocale } = require('src/data/ducks/locale')
const { getDetailsItemId } = require('src/data/ducks/explore')

const fetchBudgetItemDetails = require('src/data/modules/fetchers/fetchBudgetItemDetails')

const {
  getDetailsLoadedForItemCurrentLocale
} = require('src/data/modules/entities/budgetItem/loaded')

const BudgetItemDetailsFetcher = React.createClass({
  propTypes: {
    detailsLoaded: bool.isRequired,
    itemId: string.isRequired,
    fetchBudgetItemDetails: func.isRequired
  },

  fetchDetails () {
    const { itemId, detailsLoaded, fetchBudgetItemDetails } = this.props

    if (!detailsLoaded) fetchBudgetItemDetails(itemId)
  },

  componentDidMount () {
    this.fetchDetails()
  },

  render () {
    return null
  }
})

const mapStateToProps = (state, {itemId}) => ({
  itemId: getDetailsItemId(state),
  detailsLoaded: getDetailsLoadedForItemCurrentLocale(state, itemId),
  key: `${itemId}_${getLocale(state)}`
})

const mapDispatchToProps = dispatch => ({
  fetchBudgetItemDetails: itemId => { dispatch(fetchBudgetItemDetails(itemId)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemDetailsFetcher))
