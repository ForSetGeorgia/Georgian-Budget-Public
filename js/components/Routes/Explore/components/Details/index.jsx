const React = require('react')
const { object } = React.PropTypes
const { connect } = require('react-redux')
const { getSelectedBudgetItems } = require('js/redux/ducks/explore')

const BudgetItem = require('./components/BudgetItem/index')
const LoadingIndicator = require('js/components/shared/LoadingIndicator')

let ExploreDetails = React.createClass({
  propTypes: {
    data: object.isRequired
  },

  isLoading () {
    return Object.keys(this.props.data).length === 0
  },

  render () {
    const { data } = this.props
    let content
    if (this.isLoading()) {
      content = (
        <LoadingIndicator />
      )
    } else {
      content = (
        <div>
          {
            Object.keys(data).map(id => {
              const budgetItem = data[id]
              const { loaded } = budgetItem
              const uniqueKey = `budget-item-${id}-${loaded.join(',')}`

              return (
                <BudgetItem
                  {...budgetItem}
                  key={uniqueKey}
                  id={id}
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
  data: getSelectedBudgetItems(state)
})

ExploreDetails = connect(mapStateToProps)(ExploreDetails)

module.exports = ExploreDetails
