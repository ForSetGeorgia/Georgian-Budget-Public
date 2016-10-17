const React = require('react')
const { string, func, object } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')
const getLocationWithQuery = require('js/helpers/getLocationWithQuery')
const BudgetItemTypeSelect = require('../presentation/BudgetItemTypeSelect')
const budgetItemTypeMessages = require('js/messages/budgetItemTypes')

const { setBudgetItems } = require('js/ducks/data/budgetItems')

const { setBudgetItemsFilterVisibility } 
= require('js/ducks/filters/budgetItems')

const { setBudgetItemType } = require('js/ducks/filters/budgetItemType')
const { updateBudgetItemFilterOptions } = require('js/actions')

const messages = defineMessages({
  label: {
    id: 'app.filters.budgetItemType.label',
    description: 'Label text for budget item type filter',
    defaultMessage: 'Select budget item type'
  }
})

const Container = React.createClass({
  contextTypes: {
    router: object
  },

  propTypes: {
    value: string,
    queryValue: string,
    dispatchBudgetItemType: func,
    location: object,
    intl: intlShape
  },

  defaultValue: 'total',

  options () {
    const { intl } = this.props

    return [
      { value: 'total', label: intl.formatMessage(budgetItemTypeMessages.wholeBudget.one) },
      { value: 'program', label: intl.formatMessage(budgetItemTypeMessages.program.other) },
      { value: 'spending_agency', label: intl.formatMessage(budgetItemTypeMessages.spendingAgency.other) },
      { value: 'priority', label: intl.formatMessage(budgetItemTypeMessages.priority.other) }
    ]
  },

  optionValues () {
    return this.options().map((option) => option.value)
  },

  updateQueryWithNewType (value) {
    this.context.router.push(
      getLocationWithQuery(
        this.props.location,
        {
          budgetItemType: value,
          budgetItemIds: []
        }
      )
    )
  },

  handleChangeEvent (selected) {
    const { value } = selected
    if (!value) return

    this.props.dispatchBudgetItemType(selected)

    // If the value in the URL and the new value are not the same,
    // update the URL query param with the new value
    if (this.props.queryValue === value) return

    this.updateQueryWithNewType(value)
  },

  componentDidMount () {
    const { queryValue } = this.props

    if (this.optionValues().includes(queryValue)) {
      this.handleChangeEvent({ value: queryValue })
    } else {
      this.handleChangeEvent({ value: this.defaultValue })
    }
  },

  render () {
    return <BudgetItemTypeSelect
      label={this.props.intl.formatMessage(messages.label)}
      value={this.props.value}
      handleChangeEvent={this.handleChangeEvent}
      options={this.options()}
    />
  }

})

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.filters.budgetItemType.value,
    queryValue: ownProps.location.query.budgetItemType
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchBudgetItemType (selected) {
    dispatch(setBudgetItemType(selected.value))
    dispatch(setBudgetItems([]))
    dispatch(setBudgetItemsFilterVisibility(selected.value !== 'total'))
    dispatch(updateBudgetItemFilterOptions())
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Container))
