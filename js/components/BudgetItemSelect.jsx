const React = require('react')
const { PropTypes } = React
const { connect } = require('react-redux')
const $ = require('jquery')

const Select = require('react-select')

const { setSelectedBudgetItemId, setError, clearError, setBudgetItems } = require('../actions')

let BudgetItemSelect = React.createClass({
  propTypes: {
    handleInputChange: PropTypes.func.isRequired,
    selectedItem: PropTypes.number.isRequired
  },
  render: function () {
    var options = [
      { value: 1336, label: 'სსიპ - საჯარო აუდიტის ინსტიტუტი' },
      { value: 963, label: 'მოსამართლეებისა და სასამართლოს თანამშრომლების მომზადება-გადამზადება' }
    ]
    return (
      <Select
        name='budget-item-select'
        value={this.props.selectedItem}
        options={options}
        onChange={this.props.handleInputChange}
      />
    )
  }
})

const mapStateToProps = (state) => {
  return {
    selectedItem: state.selectedItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: function (selected) {
      const value = Number(selected.value)

      dispatch(setSelectedBudgetItemId(value))
      $.getJSON(
        'https://dev-budget.jumpstart.ge/en/api/v1',
        {
          financeType: 'spent_finance',
          budgetItemIds: [value]
        },
        function (response) {
          if (response.error) {
            dispatch(setError(response.error))
          } else {
            dispatch(clearError())
          }
          if (response.budget_items) {
            dispatch(setBudgetItems(response.budget_items))
          }
        }
      )
    }
  }
}

BudgetItemSelect = connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelect)

module.exports = BudgetItemSelect
