const React = require('react')
const { array, func, object } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')
const { withRouter } = require('react-router')
const budgetItemTypeMessages = require('src/messages/budgetItemTypes')
const snakeToCamel = require('src/utilities/snakeToCamel')
const { budgetItemTypes } = require('src/data/modules/entities/budgetItem')

const { getDetailsItemId } = require('src/data/ducks/explore')
const { setBudgetItemType } = require('src/data/ducks/filters')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')
const changeQueryOption = require('src/data/modules/changeQueryOption')

const {
  getChildItemsOfTypeForItem
} = require('src/data/modules/entities/budgetItem')

const ButtonSelector = require('src/components/shared/ButtonSelector')

const BudgetItemTypeSelect = React.createClass({
  contextTypes: {
    location: object
  },

  propTypes: {
    setBudgetItemType: func.isRequired,
    router: object.isRequired,
    options: array.isRequired
  },

  handleChangeEvent (selectedBudgetItemType) {
    const { setBudgetItemType, router } = this.props
    const { location } = this.context

    changeQueryOption(router, location, { budgetItemType: selectedBudgetItemType })
    setBudgetItemType(selectedBudgetItemType)
  },

  render () {
    const { options } = this.props

    return (
      options.length > 1 ? (
        <ButtonSelector
          {...this.props}
          handleChangeEvent={this.handleChangeEvent}
        />
      ) : null
    )
  }
})

const getOptions = (state, ownProps) => {
  const { intl } = ownProps

  return budgetItemTypes
  .filter(budgetItemType =>
    getChildItemsOfTypeForItem(
      state,
      getDetailsItemId(state),
      budgetItemType
    ).length > 0
  )
  .map(budgetItemType => ({
    value: budgetItemType,
    label: intl.formatMessage(
      budgetItemTypeMessages[snakeToCamel(budgetItemType)].other
    )
  }))
}

const mapStateToProps = (state, ownProps) => ({
  detailsItemId: getDetailsItemId(state),
  selectedValue: getSelectedBudgetItemType(state),
  options: getOptions(state, ownProps)
})

const mapDispatchToProps = (dispatch, ownProps, context) => ({
  setBudgetItemType (selectedBudgetItemType) {
    dispatch(setBudgetItemType(selectedBudgetItemType))
  }
})

module.exports = injectIntl(withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect)
))
