const React = require('react')
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')
const { string } = React.PropTypes

const { getDetailsItemId } = require('src/data/ducks/explore')

const {
  getOverallBudgetIdForItem
} = require('src/data/modules/entities/budgetItem')

const ItemDetailsLink = require('src/components/shared/ItemDetailsLink')

const OverallBudgetLink = ({overallBudgetId}) => (
  !overallBudgetId ? null
  : <p>
    <ItemDetailsLink itemId={overallBudgetId} />
  </p>
)

OverallBudgetLink.propTypes = {
  overallBudgetId: string.isRequired
}

const mapStateToProps = state => ({
  overallBudgetId: getOverallBudgetIdForItem(state, getDetailsItemId(state))
})

module.exports = injectIntl(connect(mapStateToProps)(OverallBudgetLink))
