const React = require('react')
const { func, number, arrayOf } = React.PropTypes
const { connect } = require('react-redux')
const axios = require('axios')

const Select = require('react-select')

const { selectBudgetItemId, setError, clearError, setBudgetItems } = require('../actions')

let BudgetItemSelect = React.createClass({
  propTypes: {
    handleInputChange: func.isRequired,
    selectedIds: arrayOf(number).isRequired
  },
  render: function () {
    var options = [
      { value: 1769, label: 'სსიპ - საჯარო აუდიტის ინსტიტუტი' },
      { value: 1396, label: 'მოსამართლეებისა და სასამართლოს თანამშრომლების მომზადება-გადამზადება' }
    ]
    return (
      <Select
        name='budget-item-select'
        value={this.props.selectedIds[0]}
        options={options}
        onChange={this.props.handleInputChange}
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
      const value = Number(selected.value)
      dispatch(selectBudgetItemId(value))

      axios.get(
        'https://dev-budgetapi.jumpstart.ge/en/api/v1',
        {
          params: {
            financeType: 'planned_finance',
            budgetItemIds: [value]
          }
        }
      ).then((response) => {
        if (response.error) {
          dispatch(setError(response.error))
        } else {
          dispatch(clearError())
        }
        if (response.data.budget_items) {
          dispatch(setBudgetItems(response.data.budget_items))
        }
      }).catch((error) => {
        dispatch(setError(`Error communicating with Server: ${error}`))
      })
    }
  }
}

BudgetItemSelect = connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelect)

module.exports = BudgetItemSelect
