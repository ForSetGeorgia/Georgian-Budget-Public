const React = require('react')
const { bool, string, func } = React.PropTypes
const { connect } = require('react-redux')
const { intlShape, defineMessages, injectIntl } = require('react-intl')

const { setBudgetItemType } = require('src/data/ducks/filters')

const {
  switchDisplayToList,
  setParentItemId
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
    show: bool.isRequired,
    budgetItemType: string.isRequired,
    intl: intlShape.isRequired,
    setBudgetItemType: func.isRequired,
    switchDisplayToList: func.isRequired,
    selectParent: func.isRequired
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
      selectParent
    } = this.props

    setBudgetItemType(budgetItemType)
    switchDisplayToList()
    selectParent()
  },

  render () {
    if (!this.props.show) return null
    return (
      <a href='#' onClick={this.handleClickEvent}>{this.text()}</a>
    )
  }
})

const mapStateToProps = (state, ownProps) => ({
  show: getChildItemsOfTypeForItem(state, ownProps.parentItemId, ownProps.budgetItemType).length !== 0
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setBudgetItemType: value => dispatch(setBudgetItemType(value)),
  switchDisplayToList: value => dispatch(switchDisplayToList()),
  selectParent: () => dispatch(setParentItemId(ownProps.parentItemId))
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ChildItemsListLink))
