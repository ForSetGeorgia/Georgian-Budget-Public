const React = require('react')
const { string, bool } = React.PropTypes

const BudgetItemCharts = require('./components/BudgetItemCharts')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')
const ItemDetailsLink = require('src/components/shared/ItemDetailsLink')
const ParentListLink = require('./components/ParentListLink')

const overallBudgetLink = overallBudgetId => (
  !overallBudgetId ? null : (
    <ItemDetailsLink itemId={overallBudgetId} />
  )
)

const viewProgramsLink = (itemId, hasChildPrograms) => (
  !hasChildPrograms ? null : (
    <ParentListLink parentItemId={itemId} budgetItemType='program' />
  )
)

const viewAgenciesLink = (itemId, hasAgencies) => (
  !hasAgencies ? null : (
    <ParentListLink parentItemId={itemId} budgetItemType='spending_agency' />
  )
)

const BudgetItemDetails = props => {
  const {
    detailsLoaded,
    itemId,
    overallBudgetId,
    selectedTimePeriod,
    hasChildPrograms,
    hasAgencies
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
      {viewProgramsLink(itemId, hasChildPrograms)}
      <br />
      {viewAgenciesLink(itemId, hasAgencies)}
    </div>
  )
}

BudgetItemDetails.propTypes = {
  detailsLoaded: bool.isRequired,
  itemId: string.isRequired,
  overallBudgetId: string,
  selectedTimePeriod: string,
  hasChildPrograms: bool.isRequired,
  hasAgencies: bool.isRequired
}

module.exports = BudgetItemDetails
