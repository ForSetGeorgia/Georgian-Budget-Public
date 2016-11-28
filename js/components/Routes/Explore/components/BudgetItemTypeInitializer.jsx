const React = require('react')
const { connect } = require('react-redux')
const { func, object, string } = React.PropTypes

const { setBudgetItemType } = require('js/redux/ducks/filters/budgetItemType')
const { getSelectedBudgetItemType } = require('js/redux/ducks/filters/budgetItemType')

const BudgetItemTypeInitializer = React.createClass({
  contextTypes: {
    location: object.isRequired
  },

  propTypes: {
    budgetItemType: string.isRequired,
    setBudgetItemType: func.isRequired
  },

  defaultBudgetItemType: 'priority',

  initializeBudgetItemType () {
    const { budgetItemType: queryBudgetItemType } = this.context.location.query

    const budgetItemTypes = ['total', 'priority', 'spending_agency', 'program']

    if (budgetItemTypes.includes(queryBudgetItemType)) {
      this.props.setBudgetItemType(queryBudgetItemType)
    } else {
      this.props.setBudgetItemType(this.defaultBudgetItemType)
    }
  },

  componentDidMount () {
    const { budgetItemType } = this.props

    if (!budgetItemType) this.initializeBudgetItemType()
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  budgetItemType: getSelectedBudgetItemType(state)
})

const mapDispatchToProps = dispatch => ({
  setBudgetItemType (value) {
    dispatch(setBudgetItemType(value))
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeInitializer)
