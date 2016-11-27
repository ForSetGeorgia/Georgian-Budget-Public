const React = require('react')
const { string, func, object } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')
const getLocationWithQuery = require('js/helpers/getLocationWithQuery')
const GBSelect = require('./GBSelect')
const budgetItemTypeMessages = require('js/messages/budgetItemTypes')

const { setBudgetItemType } = require('js/redux/ducks/filters/budgetItemType')

const fetchListedBudgetItems =
require('js/redux/fetchers/fetchListedBudgetItems')

const messages = defineMessages({
  label: {
    id: 'app.filters.budgetItemType.label',
    description: 'Label text for budget item type filter',
    defaultMessage: 'Select budget item type'
  }
})

const BudgetItemTypeSelect = React.createClass({
  contextTypes: {
    router: object,
    location: object
  },

  propTypes: {
    value: string,
    queryValue: string,
    intl: intlShape,
    setBudgetItemType: func,
    fetchListedBudgetItems: func
  },

  defaultValue: 'total',

  options () {
    const { intl } = this.props

    return [
      { value: 'total', label: intl.formatMessage(budgetItemTypeMessages.wholeBudget.one) },
      { value: 'priority', label: intl.formatMessage(budgetItemTypeMessages.priority.other) },
      { value: 'spending_agency', label: intl.formatMessage(budgetItemTypeMessages.spendingAgency.other) },
      { value: 'program', label: intl.formatMessage(budgetItemTypeMessages.program.other) }
    ]
  },

  optionValues () {
    return this.options().map((option) => option.value)
  },

  updateQueryWithNewType (value) {
    this.context.router.push(
      getLocationWithQuery(
        this.context.location,
        {
          budgetItemType: value,
          budgetItemIds: []
        }
      )
    )
  },

  queryValue () {
    const { location } = this.context

    return location.query.budgetItemType
  },

  updateWithNewValue (newValue) {
    this.props.setBudgetItemType(newValue)
    this.props.fetchListedBudgetItems()

    // If the value in the URL and the new value are not the same,
    // update the URL query param with the new value
    if (this.queryValue() === newValue) return

    this.updateQueryWithNewType(newValue)
  },

  handleChangeEvent (selected) {
    const { value: newValue } = selected
    if (!newValue) return

    this.updateWithNewValue(newValue)
  },

  componentDidMount () {
    if (this.optionValues().includes(this.queryValue())) {
      this.updateWithNewValue(this.queryValue())
    } else {
      this.updateWithNewValue(this.defaultValue)
    }
  },

  render () {
    return <GBSelect
      id='budget-item-type-select'
      name='budget-item-type-select'
      labelText={this.props.intl.formatMessage(messages.label)}
      value={this.props.value}
      handleChangeEvent={this.handleChangeEvent}
      options={this.options()}
    />
  }

})

const mapStateToProps = (state) => {
  return {
    value: state.filters.budgetItemType.value
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
