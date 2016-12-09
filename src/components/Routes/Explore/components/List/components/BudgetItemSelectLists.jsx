const React = require('react')
const { array, arrayOf, shape, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')

const { getBudgetItemsData } = require('src/data/ducks/budgetItems')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')

const {
  getChildItemsOfTypeForItem
} = require('src/data/modules/entities/budgetItem')

const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemSelectList = require('./BudgetItemSelectList')
const ItemDetailsLink = require('src/components/shared/ItemDetailsLink')

const BudgetItemSelectLists = React.createClass({
  propTypes: {
    itemId: string,
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
    const { itemId } = this.props
    if (this.isLoading()) return <LoadingIndicator />

    return (
      <div>
        <ItemDetailsLink itemId={itemId} />
        {this.props.lists.map(list => this.renderList(list))}
      </div>
    )
  }
})

const getListedItemIds = (state, itemId, budgetItemType) => {
  const budgetItems = getBudgetItemsData(state)
  const budgetItemIds = Object.keys(budgetItems)

  const childrenOfParent = getChildItemsOfTypeForItem(state, itemId, budgetItemType)

  return budgetItemIds.filter(
    id => childrenOfParent.indexOf(id) > -1
  )
}

const getLists = (state, itemId) => {
  const budgetItemType = getSelectedBudgetItemType(state)

  return [{
    typeOfItems: budgetItemType,
    itemIds: getListedItemIds(state, itemId, budgetItemType)
  }]
}

const mapStateToProps = (state, {itemId}) => ({
  lists: getLists(state, itemId)
})

module.exports = injectIntl(connect(mapStateToProps, null)(BudgetItemSelectLists))
