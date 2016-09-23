const React = require('react')
const { PropTypes } = React
const { connect } = require('react-redux')
const $ = require('jquery')

const Select = require('react-select')

const { setError, clearError, setBudgetItems } = require('../actions')

let BudgetItemSelect = React.createClass({
  propTypes: {
    handleInputChange: PropTypes.func.isRequired
  },
  render: function () {
    var options = [
      { value: '1336', label: 'სსიპ - საჯარო აუდიტის ინსტიტუტი' },
      { value: '963', label: 'მოსამართლეებისა და სასამართლოს თანამშრომლების მომზადება-გადამზადება' }
    ];
    return (
      <Select
        name='budget-item-select'
        value='981'
        options={options}
        onChange={this.props.handleInputChange}
      />
    )
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: function (selected) {
      $.getJSON(
        'https://dev-budget.jumpstart.ge/en/api/v1',
        {
          financeType: 'spent_finance',
          budgetItemIds: [Number(selected.value)]
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

BudgetItemSelect = connect(null, mapDispatchToProps)(BudgetItemSelect)

module.exports = BudgetItemSelect
