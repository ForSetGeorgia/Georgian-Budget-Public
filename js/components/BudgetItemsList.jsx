const React = require('react')
const { arrayOf, object, bool } = React.PropTypes
const { connect } = require('react-redux')

const Error = require('js/components/Error')
const BudgetItem = require('js/components/BudgetItem')
const LoadingIndicator = require('js/components/LoadingIndicator')

let BudgetItemsList = React.createClass({
  propTypes: {
    errors: arrayOf(object).isRequired,
    loading: bool.isRequired,
    data: arrayOf(object).isRequired
  },

  render: function () {
    if (this.props.errors.length > 0) {
      return (
        <div>
          {
            this.props.errors.map((error) => (
              <Error text={error.text} key={error.id} />
            ))
          }
        </div>
      )
    }

    if (this.props.loading) {
      return (
        <LoadingIndicator />
      )
    }

    if (this.props.data.length > 0) {
      return (
        <div>
          {
            this.props.data.map(
              function (budgetItem) {
                if (!budgetItem) return null

                const uniqueId = `budget-item-${budgetItem.name}-${budgetItem.chartName}`

                return (
                  <BudgetItem
                    key={uniqueId}
                    id={uniqueId}
                    {...budgetItem}
                  />
                )
              }
            )
          }
        </div>
      )
    }

    return <div></div>
  }
})

const mapStateToProps = function (state) {
  return state.budgetItems
}

BudgetItemsList = connect(mapStateToProps)(BudgetItemsList)

module.exports = BudgetItemsList
