const React = require('react')
const { array, arrayOf, shape, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')
const snakeToCamel = require('src/utilities/snakeToCamel')

const { getBudgetItemsData } = require('src/data/ducks/budgetItems')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { getDetailsItemId } = require('src/data/ducks/explore')

const {
  getChildItemsOfTypeForItem
} = require('src/data/modules/entities/budgetItem')

const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemSelectList = require('./components/BudgetItemSelectList')
const CountDisplay = require('./components/CountDisplay')
const budgetItemTypeMessages = require('src/messages/budgetItemTypes')
const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const TimePeriodSelect = require('src/components/shared/TimePeriodSelect')

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
      <div>
        <div className='gb-BudgetItem-selectListHeader'>
          <h3>
            <CountDisplay
              count={list.itemIds.length}
              itemTranslations={budgetItemTypeMessages[snakeToCamel(list.typeOfItems)]}
            />
          </h3>

          <div className='gb-BudgetItem-selectListHeader-controls'>
            <BudgetItemTypeSelect />

            <div className='gb-BudgetItem-selectListHeader-controls-row2'>
              <FinanceTypeSelect />
              <TimePeriodSelect />
            </div>
          </div>
        </div>

        <BudgetItemSelectList
          key={list.typeOfItems}
          {...list}
        />
      </div>
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

const getListedItemIds = (state, itemId, budgetItemType) => {
  const budgetItems = getBudgetItemsData(state)
  const budgetItemIds = Object.keys(budgetItems)

  const childrenOfItem = getChildItemsOfTypeForItem(state, itemId, budgetItemType)

  return budgetItemIds.filter(
    id => childrenOfItem.indexOf(id) > -1
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
  lists: getLists(state, getDetailsItemId(state))
})

module.exports = injectIntl(connect(mapStateToProps, null)(BudgetItemSelectLists))
