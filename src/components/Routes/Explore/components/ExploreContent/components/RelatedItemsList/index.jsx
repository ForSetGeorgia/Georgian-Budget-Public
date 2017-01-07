const React = require('react')
const { string } = React.PropTypes
const { connect } = require('react-redux')

const { getSelectedBudgetItemType } = require('src/data/ducks/filters')

const BudgetItemSelectList = require('./components/BudgetItemSelectList')
const RelatedItemsListHeader = require('./components/RelatedItemsListHeader')
const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const TimePeriodSelect = require('src/components/shared/TimePeriodSelect')

const RelatedItemsList = props => {
  if (!props.budgetItemType) return null

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

RelatedItemsList.propTypes = {
  budgetItemType: string
}

const mapStateToProps = state => ({
  budgetItemType: getSelectedBudgetItemType(state)
})

module.exports = connect(mapStateToProps)(RelatedItemsList)
