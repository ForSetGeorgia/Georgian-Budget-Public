const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getSelectedBudgetItemType } = require('js/redux/ducks/filters')

const fetchListedBudgetItems =
require('js/redux/fetchers/fetchListedBudgetItems')

const BudgetItemListFetcher = React.createClass({
  propTypes: {
    budgetItemType: string.isRequired,
    fetchListedBudgetItems: func.isRequired
  },

  listIsLoaded () {
    return false
  },

  fetchList () {
    if (!this.listIsLoaded()) {
      this.props.fetchListedBudgetItems()
    }
  },

  componentDidUpdate () {
    this.fetchList()
  },

  componentDidMount () {
    this.fetchList()
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  budgetItemType: getSelectedBudgetItemType(state)
})

const mapDispatchToProps = dispatch => ({
  fetchListedBudgetItems: () => { dispatch(fetchListedBudgetItems()) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemListFetcher))
