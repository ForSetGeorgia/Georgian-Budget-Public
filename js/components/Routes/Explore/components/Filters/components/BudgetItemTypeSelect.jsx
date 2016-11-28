const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')
const budgetItemTypeMessages = require('js/messages/budgetItemTypes')
const { snakeToCamel } = require('js/helpers/utilities')
const { budgetItemTypes } = require('js/redux/entities/budgetItem')

const { setBudgetItemType } = require('js/redux/ducks/filters/budgetItemType')
const { getSelectedBudgetItemType } = require('js/redux/ducks/filters/budgetItemType')

const fetchListedBudgetItems =
require('js/redux/fetchers/fetchListedBudgetItems')

const GBSelect = require('./GBSelect')

const messages = defineMessages({
  label: {
    id: 'app.filters.budgetItemType.label',
    description: 'Label text for budget item type filter',
    defaultMessage: 'Select budget item type'
  }
})

const BudgetItemTypeSelect = React.createClass({
  propTypes: {
    value: string,
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

  handleChangeEvent ({ value }) {
    this.props.setBudgetItemType(value)
    this.props.fetchListedBudgetItems()
  },

  render () {
    return (
      <GBSelect
        id='budget-item-type-select'
        name='budget-item-type-select'
        labelText={this.props.intl.formatMessage(messages.label)}
        value={this.props.value}
        handleChangeEvent={this.handleChangeEvent}
        options={this.options()}
      />
    )
  }

})

const mapStateToProps = (state) => {
  return {
    value: getSelectedBudgetItemType(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  setBudgetItemType (value) {
    dispatch(setBudgetItemType(value))
  },
  fetchListedBudgetItems () {
    dispatch(fetchListedBudgetItems())
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect))
