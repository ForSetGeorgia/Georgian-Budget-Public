const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')

const Select = require('react-select')

const { setBudgetItemType, updateBudgetItemFilterOptions } = require('../actions')

let BudgetItemTypeSelect = React.createClass({
  propTypes: {
    value: string,
    handleChange: func
  },

  render: function () {
    const options = [
      { value: 'total', label: 'Complete Georgian Budget' },
      { value: 'program', label: 'Programs' },
      { value: 'spending_agency', label: 'Spending Agencies' },
      { value: 'priority', label: 'Priorities' }
    ]

    return (
      <Select
        name='budget-item-type-select'
        value={this.props.value}
        options={options}
        onChange={this.props.handleChange}
        clearable={false}
      />
    )
  }
})

const mapStateToProps = (state) => {
  return {
    value: state.filters.budgetItemType.value
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleChange (selected) {
    dispatch(setBudgetItemType(selected.value))
    dispatch(updateBudgetItemFilterOptions())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect)
