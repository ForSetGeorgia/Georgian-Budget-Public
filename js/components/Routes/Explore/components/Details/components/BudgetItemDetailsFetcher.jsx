const React = require('react')
const { arrayOf, func, object, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getLocale } = require('js/data/ducks/locale')
const fetchBudgetItemDetails = require('js/data/modules/fetchers/fetchBudgetItemDetails')
const { getBudgetItemsData } = require('js/data/ducks/budgetItems')
const { getSelectedBudgetItemIds } = require('js/data/ducks/explore')

const BudgetItemDetailsFetcher = React.createClass({
  propTypes: {
    budgetItems: object.isRequired,
    selectedIds: arrayOf(string).isRequired,
    fetchBudgetItemDetails: func.isRequired,
    locale: string.isRequired
  },

  detailsLoaded (itemId) {
    const { budgetItems } = this.props
    if (!budgetItems[itemId]) return false
    if (!budgetItems[itemId].loaded.includes('details')) return false

    return true
  },

  fetchDetails () {
    const { selectedIds, fetchBudgetItemDetails } = this.props

    selectedIds.forEach(selectedId => {
      if (!this.detailsLoaded(selectedId)) {
        fetchBudgetItemDetails(selectedId)
      }
    })
  },

  componentDidMount () {
    this.fetchDetails()
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  selectedIds: getSelectedBudgetItemIds(state),
  budgetItems: getBudgetItemsData(state),
  locale: getLocale(state)
})

const mapDispatchToProps = dispatch => ({
  fetchBudgetItemDetails: itemId => { dispatch(fetchBudgetItemDetails(itemId)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemDetailsFetcher))
