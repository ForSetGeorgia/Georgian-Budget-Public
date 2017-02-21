const React = require('react')
const { array, string } = React.PropTypes
const { connect } = require('react-redux')

const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { getListedItemIds } = require('src/data/modules/list')
const snakeToCamel = require('src/utilities/snakeToCamel')
const budgetItemTypeMessages = require('src/messages/budgetItemTypes')

const CountDisplay = require('./CountDisplay')

const RelatedItemsListHeader = ({itemIds, budgetItemType}) => (
  <h3>
    <CountDisplay
      count={itemIds.length}
      itemTranslations={budgetItemTypeMessages[snakeToCamel(budgetItemType)]}
    />
  </h3>
)

RelatedItemsListHeader.propTypes = {
  itemIds: array,
  budgetItemType: string
}

const mapStateToProps = state => ({
  itemIds: getListedItemIds(state),
  budgetItemType: getSelectedBudgetItemType(state)
})

module.exports = connect(mapStateToProps)(RelatedItemsListHeader)
