const React = require('react')

const BudgetItemTypeInitializer = require('./components/BudgetItemTypeInitializer')
const FinanceTypeInitializer = require('./components/FinanceTypeInitializer')
const TimePeriodsInitializer = require('./components/TimePeriodsInitializer')
const DetailsItemIdInitializer = require('./components/DetailsItemIdInitializer')
const ExploreDisplayInitializer = require('./components/ExploreDisplayInitializer')

const Initializers = () => (
  <div>
    <BudgetItemTypeInitializer />
    <FinanceTypeInitializer />
    <TimePeriodsInitializer />
    <DetailsItemIdInitializer />
    <ExploreDisplayInitializer />
  </div>
)

module.exports = Initializers
