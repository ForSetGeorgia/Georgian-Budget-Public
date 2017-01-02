const React = require('react')
const { string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const BudgetItemSelectLists = require('./components/BudgetItemSelectLists')
const BudgetItemListFetcher = require('./components/BudgetItemListFetcher')
const BudgetItemDetailsFetcher = require('src/components/shared/BudgetItemDetailsFetcher')

const { getDetailsItemId } = require('src/data/ducks/explore')

const ExploreList = ({detailsItemId}) => (
  <div className='gb-ExploreList'>
    <BudgetItemListFetcher />
    <BudgetItemDetailsFetcher itemId={detailsItemId} />

    <BudgetItemTypeSelect />
    <FinanceTypeSelect />

    <BudgetItemSelectLists itemId={detailsItemId} />
  </div>
)

ExploreList.propTypes = {
  detailsItemId: string
}

const mapStateToProps = state => ({
  detailsItemId: getDetailsItemId(state)
})

module.exports = injectIntl(connect(mapStateToProps)(ExploreList))
