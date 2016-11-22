const React = require('react')
const { arrayOf, object, bool } = React.PropTypes
const { connect } = require('react-redux')
const { getErrors } = require('js/redux/ducks/budgetItems/errors')
const { getBudgetItemsLoading } = require('js/redux/ducks/budgetItems/loading')
const { getBudgetItemsData } = require('js/redux/ducks/budgetItems/data')

const Error = require('js/components/Error')
const BudgetItem = require('js/components/BudgetItem')
const LoadingIndicator = require('js/components/LoadingIndicator')

let ExploreDetails = React.createClass({
  propTypes: {
    errors: arrayOf(object).isRequired,
    loading: bool.isRequired,
    data: arrayOf(object).isRequired
  },

  render: function () {
    let content

    if (this.props.errors.length > 0) {
      content = (
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
      content = (
        <LoadingIndicator />
      )
    }

    if (this.props.data.length > 0) {
      content = (
        <div>
          {
            this.props.data.map(
              function (budgetItem) {
                if (!budgetItem) return null

                const uniqueId = `budget-item-${budgetItem.type}-${budgetItem.id}`

                return (
                  <BudgetItem
                    {...budgetItem}
                    key={uniqueId}
                    id={uniqueId}
                  />
                )
              }
            )
          }
        </div>
      )
    }

    return (<div className='gb-ExploreDetails'>
      {content}
    </div>)
  }
})

const mapStateToProps = (state) => ({
  errors: getErrors(state),
  loading: getBudgetItemsLoading(state),
  data: getBudgetItemsData(state)
})

ExploreDetails = connect(mapStateToProps)(ExploreDetails)

module.exports = ExploreDetails
