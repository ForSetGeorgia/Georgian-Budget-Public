const React = require('react')
const { arrayOf, object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedBudgetItems
} = require('js/redux/ducks/explore')

const BudgetItem = require('./components/BudgetItem/index')
const LoadingIndicator = require('js/components/shared/LoadingIndicator')

let ExploreDetails = React.createClass({
  propTypes: {
    selectedIds: arrayOf(string).isRequired,
    selectedItems: object.isRequired
  },

  isLoading () {
    return this.loadedSelectedItemIds().length === 0
  },

  loadedSelectedItemIds () {
    return Object.keys(this.props.selectedItems)
  },

  render () {
    const { selectedItems } = this.props
    let content
    if (this.isLoading()) {
      content = (
        <LoadingIndicator />
      )
    } else {
      content = (
        <div>
          {
            this.loadedSelectedItemIds().map(id => {
              const budgetItem = selectedItems[id]
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

const mapStateToProps = state => ({
  selectedItems: getSelectedBudgetItems(state)
})

ExploreDetails = connect(mapStateToProps)(ExploreDetails)

module.exports = ExploreDetails
