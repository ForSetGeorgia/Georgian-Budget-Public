const React = require('react')
const { bool } = React.PropTypes

const BudgetItemCharts = require('./components/BudgetItemCharts')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')
const BudgetItemSelectLists = require('./BudgetItemSelectLists/index')
const OverallBudgetLink = require('./components/OverallBudgetLink')
const AgencyLink = require('./components/AgencyLink')
const ParentProgramLink = require('./components/ParentProgramLink')

const BudgetItemDetails = props => {
  const { detailsLoaded } = props

  if (!detailsLoaded) return <LoadingIndicator />

  return (
    <div>
      <BudgetItemCharts />

      <BudgetItemYearlyTable />

      <OverallBudgetLink />
      <AgencyLink />
      <ParentProgramLink />

      <BudgetItemSelectLists />
    </div>
  )
}

BudgetItemDetails.propTypes = {
  detailsLoaded: bool.isRequired
}

module.exports = BudgetItemDetails
