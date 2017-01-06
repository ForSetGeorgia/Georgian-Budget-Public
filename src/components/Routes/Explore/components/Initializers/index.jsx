const React = require('react')

const BudgetItemTypeInitializer = require('./components/BudgetItemTypeInitializer')
const FinanceTypeInitializer = require('./components/FinanceTypeInitializer')
const TimePeriodsInitializer = require('./components/TimePeriodsInitializer')
const TimePeriodTypeInitializer = require('./components/TimePeriodTypeInitializer')
const DetailsItemIdInitializer = require('./components/DetailsItemIdInitializer')

const Initializers = () => (
  <div>
    <BudgetItemTypeInitializer />
    <FinanceTypeInitializer />
    <TimePeriodsInitializer />
    <TimePeriodTypeInitializer />
    <DetailsItemIdInitializer />
  </div>
)

module.exports = Initializers
