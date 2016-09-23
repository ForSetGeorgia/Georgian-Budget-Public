const React = require('react')
const { PropTypes } = React
const { connect } = require('react-redux')
const $ = require('jquery')

const { setError, clearError, setBudgetItems } = require('../actions')

let BudgetItemSelect = React.createClass({
  propTypes: {
    handleInputChange: PropTypes.func.isRequired
  },
  render: function () {
    return (
      <div>
        <input type='text' defaultValue='980' onChange={this.props.handleInputChange} />
      </div>
    )
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: function (event) {
      $.getJSON(
        'https://dev-budget.jumpstart.ge/en/api/v1',
        {
          financeType: 'spent_finance',
          budgetItemIds: [Number(event.target.value)]
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
