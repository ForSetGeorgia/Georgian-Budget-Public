const React = require('react')
const { arrayOf, object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getDetailsItemId,
  getParentItemId,
  getSelectedExploreDisplay
} = require('src/data/ducks/explore')

const {
  getSelectedBudgetItemType,
  getSelectedFinanceType,
  getSelectedTimePeriods
 } = require('src/data/ducks/filters')

const UrlQueryUpdater = React.createClass({
  contextTypes: {
    location: object,
    router: object
  },

  propTypes: {
    budgetItemType: string.isRequired,
    detailsItemId: string.isRequired,
    parentItemId: string.isRequired,
    financeType: string.isRequired,
    timePeriods: arrayOf(string).isRequired,
    exploreDisplay: string.isRequired
  },

  newQueryObject () {
    const {
      detailsItemId,
      parentItemId,
      budgetItemType,
      financeType,
      timePeriods,
      exploreDisplay
    } = this.props

    const newQueryObject = {}

    if (detailsItemId) newQueryObject.detailsItemId = detailsItemId
    if (parentItemId) newQueryObject.parentItemId = parentItemId

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
  parentItemId: getParentItemId(state),
  detailsItemId: getDetailsItemId(state),
  financeType: getSelectedFinanceType(state),
  timePeriods: getSelectedTimePeriods(state),
  exploreDisplay: getSelectedExploreDisplay(state)
})

module.exports = connect(mapStateToProps)(UrlQueryUpdater)
