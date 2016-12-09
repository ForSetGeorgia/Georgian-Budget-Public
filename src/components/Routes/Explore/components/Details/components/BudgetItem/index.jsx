const React = require('react')
const { injectIntl } = require('react-intl')
const { string } = React.PropTypes
const { connect } = require('react-redux')

const BudgetItemHeading = require('./components/BudgetItemHeading')
const BudgetItemDetails = require('./BudgetItemDetails')

const { getSelectedTimePeriods } = require('src/data/ducks/filters')

const { getDetailsLoadedForItem } =
require('src/data/modules/entities/budgetItem/loaded')

const {
  getBudgetItemName,
  getOverallBudgetIdForItem,
  getChildProgramIdsForItem
} = require('src/data/modules/entities/budgetItem')

const BudgetItem = React.createClass({
  propTypes: {
    itemId: string.isRequired,
    name: string.isRequired,
    selectedTimePeriod: string
  },

  render () {
    const { name, selectedTimePeriod } = this.props

    return (
      <div className='gb-BudgetItem'>
        <BudgetItemHeading name={name} timePeriod={selectedTimePeriod} />
        <BudgetItemDetails {...this.props} />
      </div>
    )
  }
})

const mapStateToProps = (state, ownProps) => ({
  detailsLoaded: getDetailsLoadedForItem(state, ownProps.itemId),
  name: getBudgetItemName(state, ownProps.itemId),
  selectedTimePeriod: getSelectedTimePeriods(state)[0],
  overallBudgetId: getOverallBudgetIdForItem(state, ownProps.itemId),
  hasChildPrograms: getChildProgramIdsForItem(state, ownProps.itemId).length !== 0
})

module.exports = injectIntl(connect(mapStateToProps, null)(BudgetItem))
