const React = require('react')
const Select = require('react-select')
const { connect } = require('react-redux')

const { setFinanceType, updateBudgetItems } = require('../actions')

const FinanceTypeSelect = (props) => {
  const options = [
    { value: 'spent_finance', label: 'დახარჯული ფინანსები' },
    { value: 'planned_finance', label: 'დაგეგმილი ფინანსები' }
  ]

  return (
    <Select
      name='finance-type-select'
      value={props.selectedValue}
      options={options}
      onChange={props.handleChange}
      clearable={false}
    />
  )
}

const { string, func } = React.PropTypes

FinanceTypeSelect.propTypes = {
  selectedValue: string.isRequired,
  handleChange: func.isRequired
}

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
