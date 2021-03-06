const React = require('react')
const { arrayOf, bool, func, object, shape, string } = React.PropTypes
const { intlShape, injectIntl } = require('react-intl')
const { connect } = require('react-redux')
const { withRouter } = require('react-router')

const budgetItemMessages = require('src/messages/budgetItem')

const { getSelectedFinanceType } = require('src/data/ducks/filters')
const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')
const { getItemSpentFinances } = require('src/data/modules/entities/spentFinance')
const { getItemPlannedFinances } = require('src/data/modules/entities/plannedFinance')
const { getSelectedYears } = require('src/data/modules/timePeriod/type/year')
const { translateTimePeriod } = require('src/data/modules/timePeriod/translate')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { getSearch } = require('src/data/ducks/filters')

const {
  getCurrentListLoaded,
  getListedItemIds
} = require('src/data/modules/list')

const { getDetailsItemId } = require('src/data/ducks/explore')
const switchDetailsItemId = require('src/data/thunks/switchDetailsItemId')

const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const CustomGriddle = require('src/components/shared/CustomGriddle')
const RelatedItemsTableCell = require('./RelatedItemsTableCell')
const BudgetItemListFetcher = require('./BudgetItemListFetcher')
const SearchBarContainer = require('./SearchBarContainer')

const BudgetItemSelectList = React.createClass({
  contextTypes: {
    location: object
  },

  propTypes: {
    detailsItemId: string.isRequired,
    items: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })).isRequired,
    listLoaded: bool.isRequired,
    switchDetailsItemId: func.isRequired,
    columns: arrayOf(string).isRequired,
    columnMetadata: arrayOf(object).isRequired,
    intl: intlShape,
    router: object
  },

  isLoading () {
    return !this.props.listLoaded
  },

  renderMainContent () {
    const { items, columns, columnMetadata } = this.props

    if (this.isLoading()) return <LoadingIndicator />

    return (
      <div>
        <SearchBarContainer />
        <CustomGriddle
          results={items}
          showFilter={false}
          bodyHeight='400'
          columns={columns}
          columnMetadata={columnMetadata}
          tableClassName='gb-BudgetItemSelectList'
        />
      </div>
    )
  },

  render () {
    return (
      <div>
        <BudgetItemListFetcher />
        {this.renderMainContent()}
      </div>
    )
  }
})

const getColumnMetadata = (state, intl) => (
  [{
    columnName: 'name',
    displayName: intl.formatMessage(budgetItemMessages.name),
    customComponent: RelatedItemsTableCell
  }].concat(getSelectedYears(state).map(year => ({
    columnName: year,
    displayName: translateTimePeriod(year, intl),
    customComponent: RelatedItemsTableCell
  })))
)

const getYearsAndAmounts = (state, itemId, selectedYears, financeSelector) => {
  const itemFinances = financeSelector(state, itemId)

  return selectedYears.reduce(
    (yearsAndAmounts, selectedYear) => {
      const finance = itemFinances.filter(f => f.timePeriod === selectedYear)[0]
      yearsAndAmounts[selectedYear] = finance ? finance.amount : ''
      return yearsAndAmounts
    },
    {}
  )
}

const getItemValues = (state, itemId, selectedYears) => (
  Object.assign(
    {},
    {
      id: itemId,
      name: getBudgetItemName(state, itemId)
    },
    getYearsAndAmounts(
      state,
      itemId,
      selectedYears,
      getSelectedFinanceType(state) === 'plannedFinance' ? getItemPlannedFinances : getItemSpentFinances
    )
  )
)

const getItems = (state, itemIds) => {
  const selectedYears = getSelectedYears(state)

  return (
    getListedItemIds(state)
    .map(itemId => getItemValues(state, itemId, selectedYears))
    .filter(listItem => (
      listItem.name && listItem.name.toLowerCase().includes(getSearch(state).toLowerCase())
    ))
  )
}

const getKey = state => (
  getSelectedFinanceType(state) + getSelectedBudgetItemType(state) + getSelectedYears(state).join('')
)

const mapStateToProps = (state, ownProps) => ({
  key: getKey(state),
  detailsItemId: getDetailsItemId(state),
  listLoaded: getCurrentListLoaded(state),
  items: getItems(state),
  columns: getColumnMetadata(state, ownProps.intl).map(column => column.columnName),
  columnMetadata: getColumnMetadata(state, ownProps.intl)
})

const mapDispatchToProps = dispatch => ({
  switchDetailsItemId: id => { dispatch(switchDetailsItemId(id)) }
})

module.exports = injectIntl(withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelectList)
))
