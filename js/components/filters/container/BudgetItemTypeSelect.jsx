const BudgetItemTypeSelect = require('../presentation/BudgetItemTypeSelect')
const { connect } = require('react-redux')

const {
  setBudgetItemType,
  updateBudgetItemFilterOptions
} = require('js/actions')

const mapStateToProps = (state) => {
  const props = {
    value: state.filters.budgetItemType.value
  }

  const { locationBeforeTransitions } = state.routing

  if (!locationBeforeTransitions || !locationBeforeTransitions.query) return props
  props.queryValue = locationBeforeTransitions.query.budgetItemType

  return props
}

const mapDispatchToProps = (dispatch) => ({
  dispatchBudgetItemType (selected) {
    dispatch(setBudgetItemType(selected.value))
    dispatch(updateBudgetItemFilterOptions())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect)
