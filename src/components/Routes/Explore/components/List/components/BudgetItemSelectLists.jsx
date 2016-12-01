const React = require('react')
const { arrayOf, shape, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')

const { getSelectedBudgetItemIds } = require('src/data/ducks/explore')
const { getBudgetItemsData } = require('src/data/ducks/budgetItems')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { filterArrayByType } = require('src/data/modules/entities/budgetItem')

const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemSelectList = require('./BudgetItemSelectList')

const BudgetItemSelectLists = React.createClass({
  propTypes: {
    selectedIds: arrayOf(string).isRequired,
    listedItems: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })).isRequired
  },

  rowClassName (row) {
    let className = 'gb-ExploreList-row'

    if (this.props.selectedIds.includes(row.id)) {
      className += ' is-selected'
    }

    return className
  },

  isLoading () {
    return this.props.listedItems.length === 0
  },

  render () {
    if (this.isLoading()) return <LoadingIndicator />

    return (
      <BudgetItemSelectList
        items={this.props.listedItems}
        rowMetadata={{ bodyCssClassName: this.rowClassName }}
      />
    )
  }
})

const getListedItems = state => {
  const budgetItemType = getSelectedBudgetItemType(state)

  if (!budgetItemType) return []

  const budgetItems = getBudgetItemsData(state)
  const budgetItemsArray = Object.keys(budgetItems).map(id => budgetItems[id])

  return filterArrayByType(budgetItemsArray, budgetItemType)
}

const mapStateToProps = state => ({
  selectedIds: getSelectedBudgetItemIds(state),
  listedItems: getListedItems(state)
})

module.exports = injectIntl(connect(mapStateToProps, null)(BudgetItemSelectLists))
