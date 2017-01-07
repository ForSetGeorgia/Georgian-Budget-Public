const React = require('react')
const { array, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')

const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const { getListedItemIds } = require('src/data/modules/list')

const BudgetItemSelectList = require('./components/BudgetItemSelectList')
const RelatedItemsListHeader = require('./components/RelatedItemsListHeader')
const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const TimePeriodSelect = require('src/components/shared/TimePeriodSelect')

const RelatedItemsList = React.createClass({
  propTypes: {
    budgetItemType: string,
    itemIds: array
  },

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

        <BudgetItemSelectList {...this.props} />
      </div>
    )
  }
})

const mapStateToProps = state => ({
  budgetItemType: getSelectedBudgetItemType(state),
  itemIds: getListedItemIds(state)
})

module.exports = injectIntl(connect(mapStateToProps, null)(RelatedItemsList))
