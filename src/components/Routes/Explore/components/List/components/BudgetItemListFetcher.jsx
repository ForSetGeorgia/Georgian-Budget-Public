const React = require('react')
const { bool, func } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { getExploreListLoaded } = require('src/data/ducks/explore')
const { getLocale } = require('src/data/ducks/locale')

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

const getLoadedId = state => (
  `${getSelectedBudgetItemType(state)}_${getLocale(state)}`
)

const getAlreadyFetched = state => (
  getExploreListLoaded(state).includes(getLoadedId(state))
)

const mapStateToProps = state => ({
  alreadyFetched: getAlreadyFetched(state),
  key: getLoadedId(state)
})

const mapDispatchToProps = dispatch => ({
  fetchListedBudgetItems: () => { dispatch(fetchListedBudgetItems()) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemListFetcher))
