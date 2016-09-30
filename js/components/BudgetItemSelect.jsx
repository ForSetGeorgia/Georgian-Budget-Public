const React = require('react')
const { func, number, arrayOf, shape, string, bool } = React.PropTypes
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
    })).isRequired,
    hidden: bool
  },
  componentDidMount () {
    this.props.loadOptions()
  },
  render: function () {
    let style = {}
    if (this.props.hidden) style.display = 'none'

    return (
      <Select
        name='budget-item-select'
        style={style}
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
  return state.filters.budgetItems
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
