const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')

const { setTimePeriodType } = require('js/redux/ducks/filters/timePeriodType')
const fetchBudgetItems = require('js/redux/fetchers/budgetItems')

const GBSelect = require('../GBSelect')

const timePeriodTypeMessages = require('js/messages/timePeriodTypes')

const messages = defineMessages({
  label: {
    id: 'app.filters.timePeriodType.label',
    description: 'Label for time period type filter',
    defaultMessage: 'Select time period type'
  }
})

const TimePeriodTypeSelect = React.createClass({
  propTypes: {
    value: string.isRequired,
    setTimePeriodType: func.isRequired,
    fetchBudgetItems: func.isRequired,
    intl: intlShape.isRequired
  },

  options () {
    const { formatMessage } = this.props.intl
    return [
      { value: 'monthly', label: formatMessage(timePeriodTypeMessages.monthly) },
      { value: 'quarterly', label: formatMessage(timePeriodTypeMessages.quarterly) },
      { value: 'yearly', label: formatMessage(timePeriodTypeMessages.yearly) }
    ]
  },

  handleChangeEvent (selected) {
    const { value } = selected
    this.props.setTimePeriodType(value)
    this.props.fetchBudgetItems()
  },

  render () {
    const { value, intl } = this.props

    return (
      <GBSelect
        id='time-period-type-select'
        name='time-period-type-select'
        value={value}
        handleChangeEvent={this.handleChangeEvent}
        options={this.options()}
        labelText={intl.formatMessage(messages.label)}
      />
    )
  }
})

const mapStateToProps = (state) => ({
  value: state.filters.timePeriodType.value
})

const mapDispatchToProps = (dispatch) => ({
  setTimePeriodType: (value) => {
    dispatch(setTimePeriodType(value))
  },
  fetchBudgetItems: () => {
    dispatch(fetchBudgetItems())
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(TimePeriodTypeSelect))
