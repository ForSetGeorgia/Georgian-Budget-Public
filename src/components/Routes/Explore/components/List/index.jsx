const React = require('react')
const { arrayOf, shape, string, func } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')

const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const BudgetItemSelectList = require('./components/BudgetItemSelectList')
const BudgetItemListFetcher = require('./components/BudgetItemListFetcher')

const {
  getSelectedBudgetItemIds,
  setSelectedBudgetItemIds,
  setExploreDisplay
} = require('src/data/ducks/explore')

const { getBudgetItemsData } = require('src/data/ducks/budgetItems')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { filterArrayByType } = require('src/data/modules/entities/budgetItem')

const ExploreList = React.createClass({
  propTypes: {
    selectedIds: arrayOf(string).isRequired,
    listedItems: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })).isRequired,
    setSelectedBudgetItemIds: func.isRequired,
    setExploreDisplay: func.isRequired
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
    return this.props.listedItems.length === 0
  },

  render () {
    return (
      <div className='gb-ExploreList'>
        <BudgetItemListFetcher />
        <BudgetItemTypeSelect />
        <FinanceTypeSelect />
        <BudgetItemSelectList
          listedItems={this.props.listedItems}
          loading={this.isLoading()}
          columns={['name']}
          onRowClick={this.handleClick}
          rowMetadata={{ bodyCssClassName: this.rowClassName }}
          useGriddleStyles={false}
          showFilter
          enableInfiniteScroll
          bodyHeight='400'
        />
      </div>
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

const mapDispatchToProps = dispatch => ({
  setSelectedBudgetItemIds: ids => { dispatch(setSelectedBudgetItemIds(ids)) },
  setExploreDisplay: display => { dispatch(setExploreDisplay(display)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ExploreList))
