const { connect } = require('react-redux')
const { setFinanceType, updateBudgetItems } = require('js/actions')
const FinanceTypeSelect = require('../presentation/FinanceTypeSelect')

const mapStateToProps = (state) => ({
  selectedValue: state.filters.financeType.value
})

const mapDispatchToProps = (dispatch) => ({
  handleChange (selected) {
    dispatch(setFinanceType(selected.value))
    dispatch(updateBudgetItems())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(FinanceTypeSelect)
