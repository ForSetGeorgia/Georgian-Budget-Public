const React = require('react')
const { arrayOf, func, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getSelectedBudgetItemType } = require('js/redux/ducks/filters')
const { getExploreListLoaded } = require('js/redux/ducks/explore')

const fetchListedBudgetItems =
require('js/redux/fetchers/fetchListedBudgetItems')

const BudgetItemListFetcher = React.createClass({
  propTypes: {
    budgetItemType: string.isRequired,
    listLoaded: arrayOf(string).isRequired,
    fetchListedBudgetItems: func.isRequired
  },

  listIsLoaded () {
    return false
  },

  fetchList () {
    const { listLoaded, budgetItemType, fetchListedBudgetItems } = this.props

    if (this.listIsLoaded()) return
    if (listLoaded.includes(budgetItemType)) return

    fetchListedBudgetItems()
  },

  componentDidUpdate () {
    this.fetchList()
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  listLoaded: getExploreListLoaded(state),
  budgetItemType: getSelectedBudgetItemType(state)
})

const mapDispatchToProps = dispatch => ({
  fetchListedBudgetItems: () => { dispatch(fetchListedBudgetItems()) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemListFetcher))
