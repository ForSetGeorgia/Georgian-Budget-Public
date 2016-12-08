const React = require('react')
const { string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const BudgetItemSelectLists = require('./components/BudgetItemSelectLists')
const BudgetItemListFetcher = require('./components/BudgetItemListFetcher')
const BudgetItemDetailsFetcher = require('src/components/shared/BudgetItemDetailsFetcher')

const { getParentItemId } = require('src/data/ducks/explore')

const ExploreList = ({parentItemId}) => (
  <div className='gb-ExploreList'>
    <BudgetItemListFetcher />
    <BudgetItemDetailsFetcher itemId={parentItemId} />

    <BudgetItemTypeSelect />
    <FinanceTypeSelect />

    <BudgetItemSelectLists itemId={parentItemId} />
  </div>
)

ExploreList.propTypes = {
  parentItemId: string
}

const mapStateToProps = state => ({
  parentItemId: getParentItemId(state)
})

module.exports = injectIntl(connect(mapStateToProps)(ExploreList))
