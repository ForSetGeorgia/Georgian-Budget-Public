const React = require('react')
const { arrayOf, func, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { getExploreListLoaded } = require('src/data/ducks/explore')

const fetchListedBudgetItems =
require('src/data/modules/fetchers/fetchListedBudgetItems')

const BudgetItemListFetcher = React.createClass({
  propTypes: {
    budgetItemType: string.isRequired,
    listLoaded: arrayOf(string).isRequired,
    fetchListedBudgetItems: func.isRequired
  },

  listIsLoaded () {
    const { listLoaded, budgetItemType } = this.props

    return listLoaded.includes(budgetItemType)
  },

  componentDidUpdate () {
    const { fetchListedBudgetItems } = this.props

    if (this.listIsLoaded()) return
    fetchListedBudgetItems()
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
