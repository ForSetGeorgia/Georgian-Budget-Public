const React = require('react')
const { func, number, arrayOf } = React.PropTypes
const { connect } = require('react-redux')

const Select = require('react-select')

const { setSelectedBudgetItemIds, updateBudgetItems } = require('../actions')

let BudgetItemSelect = React.createClass({
  propTypes: {
    handleInputChange: func.isRequired,
    selectedIds: arrayOf(number).isRequired
  },
  render: function () {
    const options = [
      { value: 1769, label: 'სსიპ - საჯარო აუდიტის ინსტიტუტი' },
      { value: 1396, label: 'მოსამართლეებისა და სასამართლოს თანამშრომლების მომზადება-გადამზადება' }
    ]
    return (
      <Select
        name='budget-item-select'
        value={this.props.selectedIds}
        options={options}
        onChange={this.props.handleInputChange}
        multi
        simpleValue
      />
    )
  }
})

const mapStateToProps = (state) => {
  return {
    selectedIds: state.filters.budgetItems.selectedIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: function (selected) {
      const selectedIds = selected.split(',').map((id) => Number(id))

      dispatch(setSelectedBudgetItemIds(selectedIds))
      dispatch(updateBudgetItems())
    }
  }
}

BudgetItemSelect = connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelect)

module.exports = BudgetItemSelect
