const BudgetItemSelect = require('../presentation/BudgetItemSelect')
const { connect } = require('react-redux')

const { 
  setSelectedBudgetItemIds,
  updateBudgetItems,
  updateBudgetItemFilterOptions
} = require('js/actions')

const mapStateToProps = (state) => {
  return Object.assign(
    {},
    state.filters.budgetItems,
    {
      budgetItemType: state.filters.budgetItemType.value
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOptions: function (selected) {
      dispatch(updateBudgetItemFilterOptions())
    },
    handleChange: function (selected) {
      let selectedIds
      if (selected.length === 0) {
        selectedIds = []
      } else {
        selectedIds = selected.split(',').map((id) => Number(id))
      }

      dispatch(setSelectedBudgetItemIds(selectedIds))
      dispatch(updateBudgetItems())
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelect)
