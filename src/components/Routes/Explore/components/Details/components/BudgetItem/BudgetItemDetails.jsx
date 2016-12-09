const React = require('react')
const { string, bool } = React.PropTypes

const BudgetItemCharts = require('./components/BudgetItemCharts')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')
const ItemDetailsLink = require('src/components/shared/ItemDetailsLink')
const ChildItemsListLink = require('./components/ChildItemsListLink')

const overallBudgetLink = overallBudgetId => (
  !overallBudgetId ? null : (
    <p>
      <ItemDetailsLink itemId={overallBudgetId} />
    </p>
  )
)

const priorityLink = priorityId => (
  !priorityId ? null : (
    <p>
      Priority: <ItemDetailsLink itemId={priorityId} />
    </p>
  )
)

const agencyLink = agencyId => (
  !agencyId ? null : (
    <p>
      Agency: <ItemDetailsLink itemId={agencyId} />
    </p>
  )
)

const BudgetItemDetails = props => {
  const {
    detailsLoaded,
    itemId,
    overallBudgetId,
    selectedTimePeriod,
    priorityId,
    agencyId
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
      {priorityLink(priorityId)}
      {agencyLink(agencyId)}
      <br />
      <ChildItemsListLink parentItemId={itemId} budgetItemType='program' />
      <br />
      <ChildItemsListLink parentItemId={itemId} budgetItemType='spendingAgency' />
      <br />
      <ChildItemsListLink parentItemId={itemId} budgetItemType='priority' />
    </div>
  )
}

BudgetItemDetails.propTypes = {
  detailsLoaded: bool.isRequired,
  itemId: string.isRequired,
  overallBudgetId: string,
  selectedTimePeriod: string,
  priorityId: string,
  agencyId: string
}

module.exports = BudgetItemDetails
