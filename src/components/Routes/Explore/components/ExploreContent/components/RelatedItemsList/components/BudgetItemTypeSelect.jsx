const React = require('react')
const { array } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')
const budgetItemTypeMessages = require('src/messages/budgetItemTypes')
const snakeToCamel = require('src/utilities/snakeToCamel')
const { budgetItemTypes } = require('src/data/modules/entities/budgetItem')

const { getDetailsItemId } = require('src/data/ducks/explore')
const { setBudgetItemType } = require('src/data/ducks/filters')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')

const {
  getChildItemsOfTypeForItem
} = require('src/data/modules/entities/budgetItem')

const ButtonSelector = require('src/components/shared/ButtonSelector')

const BudgetItemTypeSelect = props => (
  props.options.length > 1 ? <ButtonSelector {...props} /> : null
)

BudgetItemTypeSelect.propTypes = {
  options: array
}

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

const mapDispatchToProps = (dispatch) => ({
  handleChangeEvent (selectedBudgetItemType) {
    dispatch(setBudgetItemType(selectedBudgetItemType))
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect))
