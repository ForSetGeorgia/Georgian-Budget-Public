const React = require('react')
const { string, func, object } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')
const getLocationWithQuery = require('js/helpers/getLocationWithQuery')
const GBSelect = require('./GBSelect')
const budgetItemTypeMessages = require('js/messages/budgetItemTypes')

const { setBudgetItemType } = require('js/redux/ducks/filters/budgetItemType')

const fetchBudgetItemFilterOptions =
require('js/redux/fetchers/budgetItemFilterOptions')

const messages = defineMessages({
  label: {
    id: 'app.filters.budgetItemType.label',
    description: 'Label text for budget item type filter',
    defaultMessage: 'Select budget item type'
  }
})

const BudgetItemTypeSelect = React.createClass({
  contextTypes: {
    router: object
  },

  propTypes: {
    value: string,
    queryValue: string,
    location: object,
    intl: intlShape,
    setBudgetItemType: func,
    fetchBudgetItemFilterOptions: func
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

    this.props.setBudgetItemType(value)
    this.props.fetchBudgetItemFilterOptions()

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

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.filters.budgetItemType.value,
    queryValue: ownProps.location.query.budgetItemType
  }
}

const mapDispatchToProps = (dispatch) => ({
  setBudgetItemType (value) {
    dispatch(setBudgetItemType(value))
  },
  fetchBudgetItemFilterOptions () {
    dispatch(fetchBudgetItemFilterOptions())
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect))
