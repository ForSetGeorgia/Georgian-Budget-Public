const React = require('react')
const { arrayOf, func, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getLocale } = require('src/data/ducks/locale')
const fetchBudgetItemDetails = require('src/data/modules/fetchers/fetchBudgetItemDetails')
const { getSelectedBudgetItemIds } = require('src/data/ducks/explore')

const {
  getItemIsLoaded,
  getDetailsLoadedForItemCurrentLocale
} = require('src/data/modules/entities/budgetItem')

const BudgetItemDetailsFetcher = React.createClass({
  propTypes: {
    idsToLoad: arrayOf(string).isRequired,
    fetchBudgetItemDetails: func.isRequired
  },

  fetchDetails () {
    const { idsToLoad, fetchBudgetItemDetails } = this.props

    idsToLoad.forEach(id => fetchBudgetItemDetails(id))
  },

  componentDidMount () {
    this.fetchDetails()
  },

  render () {
    return null
  }
})

const getIdsToLoad = state => (
  getSelectedBudgetItemIds(state).filter(
    itemId => (
      !getItemIsLoaded(state, itemId) ||
      !getDetailsLoadedForItemCurrentLocale(state, itemId)
    )
  )
)

const mapStateToProps = state => ({
  idsToLoad: getIdsToLoad(state),
  key: `${getIdsToLoad(state).join(',')}_${getLocale(state)}`
})

const mapDispatchToProps = dispatch => ({
  fetchBudgetItemDetails: itemId => { dispatch(fetchBudgetItemDetails(itemId)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemDetailsFetcher))
