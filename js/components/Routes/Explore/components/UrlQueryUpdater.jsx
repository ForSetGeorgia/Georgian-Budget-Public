const React = require('react')
const { arrayOf, object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedBudgetItemIds,
  getSelectedExploreDisplay
} = require('js/data/ducks/explore')

const {
  getSelectedBudgetItemType,
  getSelectedFinanceType,
  getSelectedTimePeriods
 } = require('js/data/ducks/filters')

const UrlQueryUpdater = React.createClass({
  contextTypes: {
    location: object,
    router: object
  },

  propTypes: {
    budgetItemType: string.isRequired,
    budgetItemIds: arrayOf(string).isRequired,
    financeType: string.isRequired,
    timePeriods: arrayOf(string).isRequired,
    exploreDisplay: string.isRequired
  },

  newQueryObject () {
    const {
      budgetItemIds,
      budgetItemType,
      financeType,
      timePeriods,
      exploreDisplay
    } = this.props

    const newQueryObject = {}

    if (budgetItemIds && budgetItemIds.length > 0) {
      newQueryObject.budgetItemIds = budgetItemIds
    }

    if (timePeriods && timePeriods.length > 0) {
      newQueryObject.timePeriods = timePeriods
    }

    if (budgetItemType) newQueryObject.budgetItemType = budgetItemType
    if (financeType) newQueryObject.financeType = financeType
    if (exploreDisplay) newQueryObject.exploreDisplay = exploreDisplay

    return newQueryObject
  },

  updateQuery () {
    const { location, router } = this.context

    router.push(
      Object.assign(
        {},
        location,
        {
          query: Object.assign(
            {},
            location.query,
            this.newQueryObject()
          )
        }
      )
    )
  },

  componentDidUpdate () {
    if (!window) return
    this.updateQuery()
  },

  componentDidMount () {
    this.updateQuery()
  },

  render () {
    return null
  }
})

const mapStateToProps = (state) => ({
  budgetItemType: getSelectedBudgetItemType(state),
  budgetItemIds: getSelectedBudgetItemIds(state),
  financeType: getSelectedFinanceType(state),
  timePeriods: getSelectedTimePeriods(state),
  exploreDisplay: getSelectedExploreDisplay(state)
})

module.exports = connect(mapStateToProps)(UrlQueryUpdater)
