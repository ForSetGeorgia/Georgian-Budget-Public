const React = require('react')
const { array, arrayOf, shape, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')

const { getBudgetItemsData } = require('src/data/ducks/budgetItems')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { filterArrayByType } = require('src/data/modules/entities/budgetItem')

const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemSelectList = require('./BudgetItemSelectList')

const BudgetItemSelectLists = React.createClass({
  propTypes: {
    lists: arrayOf(shape({
      typeOfItems: string,
      itemIds: array
    }))
  },

  isLoading () {
    return this.props.lists.length === 0
  },

  renderList (list) {
    return (
      <BudgetItemSelectList
        key={list.typeOfItems}
        {...list}
      />
    )
  },

  render () {
    if (this.isLoading()) return <LoadingIndicator />

    return (
      <div>
        {this.props.lists.map(list => this.renderList(list))}
      </div>
    )
  }
})

const getListedItemIds = (state, budgetItemType) => {
  const budgetItems = getBudgetItemsData(state)
  const budgetItemsArray = Object.keys(budgetItems).map(id => budgetItems[id])

  return filterArrayByType(budgetItemsArray, budgetItemType).map(item => item.id)
}

const getLists = state => {
  const budgetItemType = getSelectedBudgetItemType(state)

  return [{
    typeOfItems: budgetItemType,
    itemIds: getListedItemIds(state, budgetItemType)
  }]
}

const mapStateToProps = state => ({
  lists: getLists(state)
})

module.exports = injectIntl(connect(mapStateToProps, null)(BudgetItemSelectLists))
