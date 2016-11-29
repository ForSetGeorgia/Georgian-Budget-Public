const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')
const budgetItemTypeMessages = require('js/messages/budgetItemTypes')
const { snakeToCamel } = require('js/helpers/utilities')
const { budgetItemTypes } = require('js/redux/entities/budgetItem')

const { setBudgetItemType } = require('js/redux/ducks/filters')
const { getSelectedBudgetItemType } = require('js/redux/ducks/filters')

const fetchListedBudgetItems =
require('js/redux/fetchers/fetchListedBudgetItems')

const ButtonSelector = require('js/components/shared/ButtonSelector')

const messages = defineMessages({
  label: {
    id: 'app.filters.budgetItemType.label',
    description: 'Label text for budget item type filter',
    defaultMessage: 'Select budget item type'
  }
})

const BudgetItemTypeSelect = React.createClass({
  propTypes: {
    selectedBudgetItemType: string,
    intl: intlShape,
    setBudgetItemType: func,
    fetchListedBudgetItems: func
  },

  options () {
    const { intl } = this.props

    return budgetItemTypes.map(budgetItemType => ({
      value: budgetItemType,
      label: intl.formatMessage(budgetItemTypeMessages[snakeToCamel(budgetItemType)].other)
    }))
  },

  handleChangeEvent (selectedBudgetItemType) {
    this.props.setBudgetItemType(selectedBudgetItemType)
    this.props.fetchListedBudgetItems()
  },

  render () {
    const { selectedBudgetItemType, intl } = this.props

    return (
      <ButtonSelector
        handleChangeEvent={this.handleChangeEvent}
        options={this.options()}
        selectedValue={selectedBudgetItemType}
        labelText={intl.formatMessage(messages.label)}
      />
    )
  }

})

const mapStateToProps = (state) => {
  return {
    selectedBudgetItemType: getSelectedBudgetItemType(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  setBudgetItemType (selectedBudgetItemType) {
    dispatch(setBudgetItemType(selectedBudgetItemType))
  },
  fetchListedBudgetItems () {
    dispatch(fetchListedBudgetItems())
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect))
