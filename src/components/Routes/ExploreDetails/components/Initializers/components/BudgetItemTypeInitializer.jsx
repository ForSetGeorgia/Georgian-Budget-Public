const React = require('react')
const { connect } = require('react-redux')
const { array, bool, func, object, string } = React.PropTypes
const { getRelatedBudgetItemTypes } = require('src/data/modules/entities/budgetItem')

const { setBudgetItemType } = require('src/data/ducks/filters')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')

const { getDetailsItemId } = require('src/data/ducks/explore')

const {
  getDetailsLoadedForItem
} = require('src/data/modules/entities/budgetItem/loaded')

const BudgetItemTypeInitializer = React.createClass({
  contextTypes: {
    location: object.isRequired
  },

  propTypes: {
    relatedBudgetItemTypes: array.isRequired,
    budgetItemType: string,
    setBudgetItemType: func.isRequired,
    detailsLoaded: bool.isRequired
  },

  defaultBudgetItemType: null,

  chooseBudgetItemType () {
    const { relatedBudgetItemTypes } = this.props
    const { budgetItemType: queryBudgetItemType } = this.context.location.query

    if (relatedBudgetItemTypes.includes(queryBudgetItemType)) {
      return queryBudgetItemType
    } else if (relatedBudgetItemTypes.length > 0) {
      return relatedBudgetItemTypes[0]
    } else {
      return this.defaultBudgetItemType
    }
  },

  initializeBudgetItemType () {
    const { budgetItemType } = this.props
    const newType = this.chooseBudgetItemType()
    if (budgetItemType !== newType) this.props.setBudgetItemType(newType)
  },

  componentDidMount () {
    const { detailsLoaded } = this.props

    // Only initialize budget item type when the selected item has been loaded
    if (!detailsLoaded) return
    this.initializeBudgetItemType()
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  key: getDetailsItemId(state) + getDetailsLoadedForItem(state, getDetailsItemId(state)),
  relatedBudgetItemTypes: getRelatedBudgetItemTypes(state, getDetailsItemId(state)),
  detailsLoaded: getDetailsLoadedForItem(state, getDetailsItemId(state)),
  budgetItemType: getSelectedBudgetItemType(state)
})

const mapDispatchToProps = dispatch => ({
  setBudgetItemType (value) {
    dispatch(setBudgetItemType(value))
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeInitializer)
