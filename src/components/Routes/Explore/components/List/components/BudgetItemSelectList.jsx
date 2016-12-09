const React = require('react')
const { arrayOf, func, object, shape, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')
const snakeToCamel = require('src/utilities/snakeToCamel')

const budgetItemTypeMessages = require('src/messages/budgetItemTypes')
const budgetItemMessages = require('src/messages/budgetItem')

const { getSelectedFinanceType } = require('src/data/ducks/filters')
const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')
const { getItemSpentFinances } = require('src/data/modules/entities/spentFinance')
const { getItemPlannedFinances } = require('src/data/modules/entities/plannedFinance')
const { getSelectedYears } = require('src/data/modules/timePeriod/type/year')
const { translateTimePeriod } = require('src/data/modules/timePeriod/translate')

const {
  getDetailsItemId,
  setDetailsItemId,
  switchDisplayToDetails
} = require('src/data/ducks/explore')

const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const CountDisplay = require('./CountDisplay')
const Griddle = require('griddle-react')
const GriddleFormattedAmount = require('src/components/shared/GriddleFormattedAmount')

const BudgetItemSelectList = React.createClass({
  propTypes: {
    detailsItemId: string.isRequired,
    typeOfItems: string.isRequired,
    items: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })).isRequired,
    setDetailsItemId: func.isRequired,
    switchDisplayToDetails: func.isRequired,
    columns: arrayOf(string).isRequired,
    columnMetadata: arrayOf(object).isRequired
  },

  handleClick (row) {
    this.props.setDetailsItemId(row.props.data.id)
    this.props.switchDisplayToDetails()
  },

  rowClassName (row) {
    let className = 'gb-ExploreList-row'

    if (this.props.detailsItemId === row.id) {
      className += ' is-selected'
    }

    return className
  },

  isLoading () {
    return this.props.items.length === 0
  },

  render () {
    const { items, typeOfItems, columns, columnMetadata } = this.props

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
          columnMetadata={columnMetadata}
        />
      </div>
    )
  }
})

const getColumnMetadata = (state, intl) => (
  [{
    columnName: 'name',
    displayName: intl.formatMessage(budgetItemMessages.name)
  }].concat(getSelectedYears(state).map(year => ({
    columnName: year,
    displayName: translateTimePeriod(year, intl),
    customComponent: GriddleFormattedAmount
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
    itemIds
    .map(itemId => getItemValues(state, itemId, selectedYears))
    .filter(listItem => listItem.name)
  )
}

const mapStateToProps = (state, ownProps) => ({
  detailsItemId: getDetailsItemId(state),
  items: getItems(state, ownProps.itemIds),
  columns: getColumnMetadata(state, ownProps.intl).map(column => column.columnName),
  columnMetadata: getColumnMetadata(state, ownProps.intl)
})

const mapDispatchToProps = dispatch => ({
  setDetailsItemId: id => { dispatch(setDetailsItemId(id)) },
  switchDisplayToDetails: display => { dispatch(switchDisplayToDetails(display)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelectList))
