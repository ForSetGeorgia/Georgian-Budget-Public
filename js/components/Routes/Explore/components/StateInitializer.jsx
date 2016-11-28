const React = require('react')
const { connect } = require('react-redux')
const { func, object, string } = React.PropTypes

const { setBudgetItemType } = require('js/redux/ducks/filters/budgetItemType')
const { getSelectedBudgetItemType } = require('js/redux/ducks/filters/budgetItemType')

const fetchListedBudgetItems =
require('js/redux/fetchers/fetchListedBudgetItems')

const { financeTypes } = require('js/redux/entities/finance')

const {
  getSelectedFinanceType,
  setFinanceType
} = require('js/redux/ducks/filters/financeType')

const StateInitializer = React.createClass({
  contextTypes: {
    location: object.isRequired
  },

  propTypes: {
    budgetItemType: string.isRequired,
    setBudgetItemType: func.isRequired,
    financeType: string.isRequired,
    setFinanceType: func.isRequired,
    fetchListedBudgetItems: func.isRequired
  },

  defaultBudgetItemType: 'priority',
  defaultFinanceType: 'spent_finance',

  initializeBudgetItemType () {
    const { budgetItemType: queryBudgetItemType } = this.context.location.query

    const budgetItemTypes = ['total', 'priority', 'spending_agency', 'program']

    if (budgetItemTypes.includes(queryBudgetItemType)) {
      this.props.setBudgetItemType(queryBudgetItemType)
    } else {
      this.props.setBudgetItemType(this.defaultBudgetItemType)
    }

    this.props.fetchListedBudgetItems()
  },

  initializeFinanceType () {
    const { setFinanceType } = this.props
    const { financeType: queryFinanceType } = this.context.location.query

    if (financeTypes.includes(queryFinanceType)) {
      setFinanceType(queryFinanceType)
    } else {
      setFinanceType(this.defaultFinanceType)
    }
  },

  componentDidMount () {
    const { budgetItemType, financeType } = this.props

    if (!budgetItemType) this.initializeBudgetItemType()
    if (!financeType) this.initializeFinanceType()
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  budgetItemType: getSelectedBudgetItemType(state),
  financeType: getSelectedFinanceType(state)
})

const mapDispatchToProps = dispatch => ({
  setBudgetItemType (value) {
    dispatch(setBudgetItemType(value))
  },
  setFinanceType (value) {
    dispatch(setFinanceType(value))
  },
  fetchListedBudgetItems () {
    dispatch(fetchListedBudgetItems())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(StateInitializer)
