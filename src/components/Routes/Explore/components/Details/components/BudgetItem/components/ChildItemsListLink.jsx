const React = require('react')
const { bool, func, number, string } = React.PropTypes
const { connect } = require('react-redux')
const { intlShape, defineMessages, injectIntl } = require('react-intl')

const { setBudgetItemType } = require('src/data/ducks/filters')

const {
  switchDisplayToList,
  setDetailsItemId
} = require('src/data/ducks/explore')

const {
  getChildItemsOfTypeForItem
} = require('src/data/modules/entities/budgetItem')

const messages = defineMessages({
  program: {
    id: 'app.parentListLink.program',
    defaultMessage: 'View Child Programs'
  },
  spendingAgency: {
    id: 'app.parentListLink.spendingAgency',
    defaultMessage: 'View Spending Agencies'
  },
  priority: {
    id: 'app.parentListLink.priority',
    defaultMessage: 'View Priorities'
  }
})

const ChildItemsListLink = React.createClass({
  propTypes: {
    childItemsCount: number.isRequired,
    show: bool.isRequired,
    budgetItemType: string.isRequired,
    intl: intlShape.isRequired,
    setBudgetItemType: func.isRequired,
    switchDisplayToList: func.isRequired,
    selectDetailsItem: func.isRequired
  },

  text () {
    const { intl, budgetItemType } = this.props
    return intl.formatMessage(messages[budgetItemType])
  },

  handleClickEvent () {
    const {
      switchDisplayToList,
      setBudgetItemType,
      budgetItemType,
      selectDetailsItem
    } = this.props

    setBudgetItemType(budgetItemType)
    switchDisplayToList()
    selectDetailsItem()
  },

  render () {
    if (!this.props.show) return null
    return (
      <a href='#' onClick={this.handleClickEvent}>
        {this.text()} ({this.props.childItemsCount})
      </a>
    )
  }
})

const mapStateToProps = (state, ownProps) => ({
  childItemsCount: getChildItemsOfTypeForItem(state, ownProps.detailsItemId, ownProps.budgetItemType).length,
  show: getChildItemsOfTypeForItem(state, ownProps.detailsItemId, ownProps.budgetItemType).length !== 0
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setBudgetItemType: value => dispatch(setBudgetItemType(value)),
  switchDisplayToList: value => dispatch(switchDisplayToList()),
  selectDetailsItem: () => dispatch(setDetailsItemId(ownProps.detailsItemId))
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ChildItemsListLink))
