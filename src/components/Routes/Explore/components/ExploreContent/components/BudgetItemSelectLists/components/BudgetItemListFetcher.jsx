const React = require('react')
const { bool, func } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const {
  getCurrentItemListLoadedId,
  getCurrentItemListLoaded
} = require('src/data/modules/entities/budgetItem/loaded')

const fetchListedBudgetItems =
require('src/data/modules/fetchers/fetchListedBudgetItems')

const BudgetItemListFetcher = React.createClass({
  propTypes: {
    alreadyFetched: bool.isRequired,
    fetchListedBudgetItems: func.isRequired
  },

  componentDidMount () {
    const { alreadyFetched, fetchListedBudgetItems } = this.props

    if (alreadyFetched) return
    fetchListedBudgetItems()
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  alreadyFetched: getCurrentItemListLoaded(state),
  key: getCurrentItemListLoadedId(state)
})

const mapDispatchToProps = dispatch => ({
  fetchListedBudgetItems: () => { dispatch(fetchListedBudgetItems()) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemListFetcher))
