const React = require('react')
const { arrayOf, object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedBudgetItemType,
  getSelectedFinanceType,
  getSelectedTimePeriods,
  getTimePeriodType
} = require('src/data/ducks/filters')

const UrlQueryUpdater = React.createClass({
  contextTypes: {
    location: object,
    router: object
  },

  propTypes: {
    budgetItemType: string,
    financeType: string.isRequired,
    timePeriods: arrayOf(string).isRequired,
    timePeriodType: string.isRequired
  },

  newQueryObject () {
    const {
      budgetItemType,
      financeType,
      timePeriods,
      timePeriodType
    } = this.props

    const newQueryObject = {}

    if (timePeriods && timePeriods.length > 0) {
      newQueryObject.timePeriods = timePeriods
    }

    if (budgetItemType) newQueryObject.budgetItemType = budgetItemType
    if (financeType) newQueryObject.financeType = financeType
    if (timePeriodType) newQueryObject.timePeriodType = timePeriodType

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
  financeType: getSelectedFinanceType(state),
  timePeriods: getSelectedTimePeriods(state),
  timePeriodType: getTimePeriodType(state)
})

module.exports = connect(mapStateToProps)(UrlQueryUpdater)
