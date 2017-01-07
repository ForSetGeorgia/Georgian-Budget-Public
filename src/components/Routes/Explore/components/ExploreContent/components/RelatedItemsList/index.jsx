const React = require('react')

const BudgetItemSelectList = require('./components/BudgetItemSelectList')
const RelatedItemsListHeader = require('./components/RelatedItemsListHeader')
const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const TimePeriodSelect = require('src/components/shared/TimePeriodSelect')

const RelatedItemsList = React.createClass({
  render () {
    return (
      <div>
        <div className='gb-BudgetItem-selectListHeader'>
          <RelatedItemsListHeader />

          <div className='gb-BudgetItem-selectListHeader-controls'>
            <BudgetItemTypeSelect />

            <div className='gb-BudgetItem-selectListHeader-controls-row2'>
              <FinanceTypeSelect />
              <TimePeriodSelect />
            </div>
          </div>
        </div>

        <BudgetItemSelectList />
      </div>
    )
  }
})

module.exports = RelatedItemsList
