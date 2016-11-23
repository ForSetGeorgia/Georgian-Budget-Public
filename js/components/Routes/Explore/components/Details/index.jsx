const React = require('react')
const { arrayOf, object, bool } = React.PropTypes
const { connect } = require('react-redux')
const { getExploreDetailsLoading } = require('js/redux/ducks/explore/details')
const { getSelectedBudgetItems } = require('js/redux/ducks/explore')

const BudgetItem = require('./components/BudgetItem/index')
const LoadingIndicator = require('js/components/shared/LoadingIndicator')

let ExploreDetails = React.createClass({
  propTypes: {
    loading: bool.isRequired,
    data: arrayOf(object).isRequired
  },

  render: function () {
    const { loading, data } = this.props
    let content
    if (loading) {
      content = (
        <LoadingIndicator />
      )
    }

    if (data !== {}) {
      content = (
        <div>
          {
            Object.keys(data).map(id => {
              let budgetItem = data[id]

              const uniqueId = `budget-item-${budgetItem.type}-${id}`

              return (
                <BudgetItem
                  {...budgetItem}
                  key={uniqueId}
                  id={uniqueId}
                />
              )
            })
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
  loading: getExploreDetailsLoading(state),
  data: getSelectedBudgetItems(state)
})

ExploreDetails = connect(mapStateToProps)(ExploreDetails)

module.exports = ExploreDetails
