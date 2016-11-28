const React = require('react')
const { object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedBudgetItems
} = require('js/redux/ducks/explore')

const BudgetItem = require('./components/BudgetItem/index')
const LoadingIndicator = require('js/components/shared/LoadingIndicator')

let ExploreDetails = React.createClass({
  contextTypes: {
    currentLocale: string
  },

  propTypes: {
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
    const { currentLocale } = this.context
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
              const uniqueKey = `budget-item-${id}-${loaded.join(',')}-${currentLocale}`

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
