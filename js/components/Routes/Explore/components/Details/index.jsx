const React = require('react')
const { arrayOf, func, object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedBudgetItemIds,
  getSelectedBudgetItems
} = require('js/redux/ducks/explore')

const fetchBudgetItemDetails = require('js/redux/fetchers/fetchBudgetItemDetails')

const BudgetItem = require('./components/BudgetItem/index')
const LoadingIndicator = require('js/components/shared/LoadingIndicator')

let ExploreDetails = React.createClass({
  propTypes: {
    fetchBudgetItemDetails: func.isRequired,
    selectedIds: arrayOf(string).isRequired,
    selectedItems: object.isRequired
  },

  isLoading () {
    return this.loadedSelectedItemIds().length === 0
  },

  loadedSelectedItemIds () {
    return Object.keys(this.props.selectedItems)
  },

  itemIdIsLoaded (id) {
    return this.loadedSelectedItemIds().includes(id)
  },

  loadUnloadedItems () {
    const { selectedIds, fetchBudgetItemDetails } = this.props

    selectedIds
    .filter(selectedId => !this.itemIdIsLoaded(selectedId))
    .forEach(unloadedId => { fetchBudgetItemDetails(unloadedId) })
  },

  componentDidUpdate () {
    if (!window) return
    this.loadUnloadedItems()
  },

  componentDidMount () {
    this.loadUnloadedItems()
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
  selectedIds: getSelectedBudgetItemIds(state),
  selectedItems: getSelectedBudgetItems(state)
})

const mapDispatchToProps = dispatch => ({
  fetchBudgetItemDetails: itemId => dispatch(fetchBudgetItemDetails(itemId))
})

ExploreDetails = connect(mapStateToProps, mapDispatchToProps)(ExploreDetails)

module.exports = ExploreDetails
