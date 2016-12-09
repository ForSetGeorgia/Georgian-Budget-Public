const React = require('react')
const { string, bool } = React.PropTypes

const BudgetItemCharts = require('./components/BudgetItemCharts')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')
const ItemDetailsLink = require('src/components/shared/ItemDetailsLink')
const ChildItemsListLink = require('./components/ChildItemsListLink')

const overallBudgetLink = overallBudgetId => (
  !overallBudgetId ? null : (
    <ItemDetailsLink itemId={overallBudgetId} />
  )
)

const BudgetItemDetails = props => {
  const {
    detailsLoaded,
    itemId,
    overallBudgetId,
    selectedTimePeriod
  } = props

  if (!detailsLoaded) return <LoadingIndicator />

  return (
    <div>
      <BudgetItemCharts
        itemId={itemId}
        selectedTimePeriod={selectedTimePeriod}
      />

      <BudgetItemYearlyTable itemId={itemId} />

      {overallBudgetLink(overallBudgetId)}
      <br />
      <ChildItemsListLink parentItemId={itemId} budgetItemType='program' />
      <br />
      <ChildItemsListLink parentItemId={itemId} budgetItemType='spending_agency' />
      <br />
      <ChildItemsListLink parentItemId={itemId} budgetItemType='priority' />
    </div>
  )
}

BudgetItemDetails.propTypes = {
  detailsLoaded: bool.isRequired,
  itemId: string.isRequired,
  overallBudgetId: string,
  selectedTimePeriod: string
}

module.exports = BudgetItemDetails
