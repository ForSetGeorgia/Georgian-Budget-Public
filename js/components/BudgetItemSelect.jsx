const React = require('react')
const { func, number, arrayOf, shape, string } = React.PropTypes
const { connect } = require('react-redux')

const Select = require('react-select')

const { setSelectedBudgetItemIds, updateBudgetItems, updateBudgetItemFilterOptions } = require('../actions')

let BudgetItemSelect = React.createClass({
  propTypes: {
    handleInputChange: func.isRequired,
    loadOptions: func.isRequired,
    selectedIds: arrayOf(number).isRequired,
    options: arrayOf(shape({
      value: number.isRequired,
      label: string.isRequired
    })).isRequired
  },
  componentDidMount () {
    this.props.loadOptions()
  },
  render: function () {
    return (
      <Select
        name='budget-item-select'
        value={this.props.selectedIds}
        options={this.props.options}
        onChange={this.props.handleInputChange}
        disabled={this.props.options.length === 0}
        multi
        simpleValue
      />
    )
  }
})

const mapStateToProps = (state) => {
  return {
    selectedIds: state.filters.budgetItems.selectedIds,
    options: state.filters.budgetItems.options
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOptions: function (selected) {
      dispatch(updateBudgetItemFilterOptions())
    },
    handleInputChange: function (selected) {
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

BudgetItemSelect = connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelect)

module.exports = BudgetItemSelect
