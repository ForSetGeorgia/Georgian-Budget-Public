const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')
const budgetItemTypeMessages = require('src/messages/budgetItemTypes')
const snakeToCamel = require('src/utilities/snakeToCamel')
const { budgetItemTypes } = require('src/data/modules/entities/budgetItem')

const { setBudgetItemType } = require('src/data/ducks/filters')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')

const ButtonSelector = require('src/components/shared/ButtonSelector')

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
    setBudgetItemType: func
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
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect))
