const React = require('react')
const { object, string, func } = React.PropTypes
const { connect } = require('react-redux')

const { injectIntl, intlShape, defineMessages } = require('react-intl')
const financeTypeMessages = require('js/messages/financeTypes')

const {
  setFinanceType,
  getSelectedFinanceType
} = require('js/redux/ducks/filters/financeType')

const GBSelect = require('./GBSelect')

const messages = defineMessages({
  label: {
    id: 'app.filters.financeType.label',
    description: 'Label for finance type filter',
    defaultMessage: 'Select finance type'
  }
})

const FinanceTypeSelect = React.createClass({
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
      {
        value: 'spent_finance',
        label: intl.formatMessage(financeTypeMessages.spentFinance.other)
      },
      {
        value: 'planned_finance',
        label: intl.formatMessage(financeTypeMessages.plannedFinance.other)
      }
    ]
  },

  optionValues () {
    return this.options().map((option) => option.value)
  },

  handleChangeEvent (selected) {
    const { value } = selected
    this.props.dispatchNewFinanceType(value)
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
      <GBSelect
        id='finance-type-select'
        name='finance-type-select'
        handleChangeEvent={this.handleChangeEvent}
        value={value}
        options={this.options()}
        labelText={intl.formatMessage(messages.label)}
      />
    )
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    value: getSelectedFinanceType(state),
    queryValue: ownProps.location.query.financeType
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchNewFinanceType (value) {
    dispatch(setFinanceType(value))
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(FinanceTypeSelect))
