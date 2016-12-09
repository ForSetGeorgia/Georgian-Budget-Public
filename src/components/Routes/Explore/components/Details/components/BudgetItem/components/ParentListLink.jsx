const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')
const { intlShape, defineMessages, injectIntl } = require('react-intl')

const { setBudgetItemType } = require('src/data/ducks/filters')

const {
  switchDisplayToList,
  setParentItemId
} = require('src/data/ducks/explore')

const messages = defineMessages({
  program: {
    id: 'app.parentListLink.program',
    defaultMessage: 'View Child Programs'
  },
  spending_agency: {
    id: 'app.parentListLink.spendingAgency',
    defaultMessage: 'View Spending Agencies'
  },
  priority: {
    id: 'app.parentListLink.priority',
    defaultMessage: 'View Priorities'
  }
})

const ParentListLink = React.createClass({
  propTypes: {
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
    return (
      <a href='#' onClick={this.handleClickEvent}>{this.text()}</a>
    )
  }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setBudgetItemType: value => dispatch(setBudgetItemType(value)),
  switchDisplayToList: value => dispatch(switchDisplayToList()),
  selectParent: () => dispatch(setParentItemId(ownProps.parentItemId))
})

module.exports = injectIntl(connect(null, mapDispatchToProps)(ParentListLink))
