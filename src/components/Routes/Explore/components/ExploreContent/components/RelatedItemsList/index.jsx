const React = require('react')
const { array, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')
const snakeToCamel = require('src/utilities/snakeToCamel')

const { getBudgetItemsData } = require('src/data/ducks/budgetItems')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { getDetailsItemId } = require('src/data/ducks/explore')

const {
  getChildItemsOfTypeForItem
} = require('src/data/modules/entities/budgetItem')

const BudgetItemSelectList = require('./components/BudgetItemSelectList')
const CountDisplay = require('./components/CountDisplay')
const budgetItemTypeMessages = require('src/messages/budgetItemTypes')
const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const TimePeriodSelect = require('src/components/shared/TimePeriodSelect')

const RelatedItemsList = React.createClass({
  propTypes: {
    budgetItemType: string,
    itemIds: array
  },

  isLoading () {
    return this.props.itemIds.length === 0
  },

  render () {
    const { itemIds, budgetItemType } = this.props

    return (
      <div>
        <div className='gb-BudgetItem-selectListHeader'>
          <h3>
            <CountDisplay
              count={itemIds.length}
              itemTranslations={budgetItemTypeMessages[snakeToCamel(budgetItemType)]}
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

        <BudgetItemSelectList {...this.props} />
      </div>
    )
  }
})

const getListedItemIds = (state) => {
  const itemId = getDetailsItemId(state)
  const budgetItemType = getSelectedBudgetItemType(state)
  const budgetItems = getBudgetItemsData(state)
  const budgetItemIds = Object.keys(budgetItems)

  const childrenOfItem = getChildItemsOfTypeForItem(state, itemId, budgetItemType)

  return budgetItemIds.filter(
    id => childrenOfItem.indexOf(id) > -1
  )
}

const mapStateToProps = state => ({
  budgetItemType: getSelectedBudgetItemType(state),
  itemIds: getListedItemIds(state)
})

module.exports = injectIntl(connect(mapStateToProps, null)(RelatedItemsList))
