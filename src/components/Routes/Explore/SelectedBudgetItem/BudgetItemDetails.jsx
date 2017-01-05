const React = require('react')
const { string, bool } = React.PropTypes

const BudgetItemCharts = require('./components/BudgetItemCharts')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')
const BudgetItemSelectLists = require('./BudgetItemSelectLists/index')
const OverallBudgetLink = require('./components/OverallBudgetLink')
const AgencyLink = require('./components/AgencyLink')
const ParentProgramLink = require('./components/ParentProgramLink')

const BudgetItemDetails = props => {
  const {
    detailsLoaded,
    itemId,
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

      <OverallBudgetLink />
      <AgencyLink />
      <ParentProgramLink />

      <BudgetItemSelectLists itemId={itemId} />
    </div>
  )
}

BudgetItemDetails.propTypes = {
  detailsLoaded: bool.isRequired,
  itemId: string.isRequired,
  selectedTimePeriod: string,
  agencyId: string
}

module.exports = BudgetItemDetails
