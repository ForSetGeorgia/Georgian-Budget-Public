const React = require('react')
const { string, func, object } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')
const getLocationWithQuery = require('js/helpers/getLocationWithQuery')
const BudgetItemTypeSelect = require('../presentation/BudgetItemTypeSelect')

const {
  setBudgetItemType,
  updateBudgetItemFilterOptions
} = require('js/actions')

const messages = defineMessages({
  label: {
    id: 'app.filters.budgetItemType.label',
    description: 'Label text for budget item type filter',
    defaultMessage: 'Select budget item type'
  },
  wholeBudget: {
    id: 'budgetType.wholeBudget',
    description: 'Name of the whole Georgian budget',
    defaultMessage: 'Whole Budget'
  },
  programs: {
    id: 'budgetType.program.other',
    description: 'The text for multiple programs',
    defaultMessage: 'Programs'
  },
  spendingAgencies: {
    id: 'budgetType.spendingAgency.other',
    description: 'Multiple spending agencies',
    defaultMessage: 'Spending Agencies'
  },
  priorities: {
    id: 'budgetType.priority.other',
    description: 'Multiple priorities',
    defaultMessage: 'Priorities'
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
      { value: 'total', label: intl.formatMessage(messages.wholeBudget) },
      { value: 'program', label: intl.formatMessage(messages.programs) },
      { value: 'spending_agency', label: intl.formatMessage(messages.spendingAgencies) },
      { value: 'priority', label: intl.formatMessage(messages.priorities) }
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
    dispatch(updateBudgetItemFilterOptions())
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Container))
