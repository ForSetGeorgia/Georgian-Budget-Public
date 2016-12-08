const React = require('react')

const BudgetItemTypeInitializer = require('./components/BudgetItemTypeInitializer')
const FinanceTypeInitializer = require('./components/FinanceTypeInitializer')
const TimePeriodsInitializer = require('./components/TimePeriodsInitializer')
const DetailsItemIdInitializer = require('./components/DetailsItemIdInitializer')
const ParentItemIdInitializer = require('./components/ParentItemIdInitializer')
const ExploreDisplayInitializer = require('./components/ExploreDisplayInitializer')

const Initializers = () => (
  <div>
    <BudgetItemTypeInitializer />
    <FinanceTypeInitializer />
    <TimePeriodsInitializer />
    <DetailsItemIdInitializer />
    <ParentItemIdInitializer />
    <ExploreDisplayInitializer />
  </div>
)

module.exports = Initializers
