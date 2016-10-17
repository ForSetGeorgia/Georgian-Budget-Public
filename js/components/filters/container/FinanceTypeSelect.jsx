const React = require('react')
const { object, string, func } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')

const { updateBudgetItems } = require('js/actions')
const { setFinanceType } = require('js/ducks/filters/financeType')

const getLocationWithQuery = require('js/helpers/getLocationWithQuery')
const FinanceTypeSelect = require('../presentation/FinanceTypeSelect')

const messages = defineMessages({
  label: {
    id: 'app.filters.financeType.label',
    description: 'Label for finance type filter',
    defaultMessage: 'Select finance type'
  },
  spentFinance: {
    id: 'financeType.spentFinance.other',
    description: 'Multiple spent finances',
    defaultMessage: 'Spent Finances'
  },
  plannedFinance: {
    id: 'financeType.plannedFinance.other',
    description: 'Multiple planned finances',
    defaultMessage: 'Planned Finances'
  }
})

const Container = React.createClass({
  contextTypes: {
    router: object
  },

  propTypes: {
    dispatchNewFinanceType: func.isRequired,
    value: string.isRequired,
    queryValue: string,
    location: object,
    intl: intlShape
  },

  defaultValue: 'spent_finance',

  options () {
    const { intl } = this.props

    return [
      { value: 'spent_finance', label: intl.formatMessage(messages.spentFinance) },
      { value: 'planned_finance', label: intl.formatMessage(messages.plannedFinance) }
    ]
  },

  optionValues () {
    return this.options().map((option) => option.value)
  },

  handleChangeEvent (selected) {
    const { value } = selected
    this.props.dispatchNewFinanceType(value)

    this.context.router.push(
      getLocationWithQuery(
        this.props.location,
        { financeType: value }
      )
    )
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
    const { intl, value } = this.props

    return (
      <FinanceTypeSelect
        handleChange={this.handleChangeEvent}
        value={value}
        options={this.options()}
        label={intl.formatMessage(messages.label)}
      />
    )
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.filters.financeType.value,
    queryValue: ownProps.location.query.financeType
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchNewFinanceType (value) {
    dispatch(setFinanceType(value))
    dispatch(updateBudgetItems())
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Container))
