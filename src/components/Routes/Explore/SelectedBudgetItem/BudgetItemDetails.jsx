const React = require('react')
const { string, bool } = React.PropTypes

const BudgetItemCharts = require('./components/BudgetItemCharts')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')
const ItemDetailsLink = require('src/components/shared/ItemDetailsLink')
const BudgetItemSelectLists = require('./BudgetItemSelectLists/index')
const OverallBudgetLink = require('./components/OverallBudgetLink')
const AgencyLink = require('./components/AgencyLink')

const BudgetItemDetails = props => {
  const {
    detailsLoaded,
    itemId,
    selectedTimePeriod,
    parentProgramId
  } = props

  const parentProgramLink = parentProgramId => (
    !parentProgramId ? null : (
      <p>
        Parent Program: <ItemDetailsLink itemId={parentProgramId} />
      </p>
    )
  )

  if (!detailsLoaded) return <LoadingIndicator />

  return (
    <div>
      <BudgetItemCharts
        itemId={itemId}
        selectedTimePeriod={selectedTimePeriod}
      />

      <BudgetItemYearlyTable itemId={itemId} />

      <OverallBudgetLink />
      <AgencyLink />
      {parentProgramLink(parentProgramId)}

      <BudgetItemSelectLists itemId={itemId} />
    </div>
  )
}

BudgetItemDetails.propTypes = {
  detailsLoaded: bool.isRequired,
  itemId: string.isRequired,
  selectedTimePeriod: string,
  agencyId: string,
  parentProgramId: string
}

module.exports = BudgetItemDetails
