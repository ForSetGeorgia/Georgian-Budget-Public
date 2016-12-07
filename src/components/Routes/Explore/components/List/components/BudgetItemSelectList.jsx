const React = require('react')
const { arrayOf, func, shape, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')
const snakeToCamel = require('src/utilities/snakeToCamel')

const budgetItemTypeMessages = require('src/messages/budgetItemTypes')

const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')

const { getSelectedYears } = require('src/data/modules/timePeriod/type/year')

const {
  getSelectedBudgetItemIds,
  setSelectedBudgetItemIds,
  setExploreDisplay
} = require('src/data/ducks/explore')

const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const CountDisplay = require('./CountDisplay')
const Griddle = require('griddle-react')

const BudgetItemSelectList = React.createClass({
  propTypes: {
    selectedIds: arrayOf(string).isRequired,
    typeOfItems: string.isRequired,
    items: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })).isRequired,
    setSelectedBudgetItemIds: func.isRequired,
    setExploreDisplay: func.isRequired,
    columns: arrayOf(string)
  },

  handleClick (row) {
    const selectedIds = [row.props.data.id]
    this.props.setSelectedBudgetItemIds(selectedIds)
    this.props.setExploreDisplay('details')
  },

  rowClassName (row) {
    let className = 'gb-ExploreList-row'

    if (this.props.selectedIds.includes(row.id)) {
      className += ' is-selected'
    }

    return className
  },

  isLoading () {
    return this.props.items.length === 0
  },

  render () {
    const { items, typeOfItems, columns } = this.props

    if (this.isLoading()) return <LoadingIndicator />

    return (
      <div>
        <CountDisplay
          count={items.length}
          itemTranslations={budgetItemTypeMessages[snakeToCamel(typeOfItems)]}
        />
        <Griddle
          results={items}
          onRowClick={this.handleClick}
          showFilter
          enableInfiniteScroll
          bodyHeight='400'
          columns={columns}
          rowMetadata={{ bodyCssClassName: this.rowClassName }}
        />
      </div>
    )
  }
})

const getColumns = state => (
  ['name'].concat(getSelectedYears(state))
)

const getItems = (state, itemIds) => (
  itemIds
  .map(itemId => ({
    id: itemId,
    name: getBudgetItemName(state, itemId)
  }))
  .filter(listItem => listItem.name)
)

const mapStateToProps = (state, ownProps) => ({
  selectedIds: getSelectedBudgetItemIds(state),
  items: getItems(state, ownProps.itemIds),
  columns: getColumns(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedBudgetItemIds: ids => { dispatch(setSelectedBudgetItemIds(ids)) },
  setExploreDisplay: display => { dispatch(setExploreDisplay(display)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelectList))
