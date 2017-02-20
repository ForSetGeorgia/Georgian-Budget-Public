const React = require('react')

const DetailsItemIdInitializer = require('./components/DetailsItemIdInitializer')
const BudgetItemTypeInitializer = require('./components/BudgetItemTypeInitializer')
const FinanceTypeInitializer = require('./components/FinanceTypeInitializer')
const TimePeriodsInitializer = require('./components/TimePeriodsInitializer')
const TimePeriodTypeInitializer = require('./components/TimePeriodTypeInitializer')

const Initializers = () => (
  <div>
    <DetailsItemIdInitializer />
    <BudgetItemTypeInitializer />
    <FinanceTypeInitializer />
    <TimePeriodsInitializer />
    <TimePeriodTypeInitializer />
  </div>
)

module.exports = Initializers
