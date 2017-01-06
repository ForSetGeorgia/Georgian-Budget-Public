const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')
const timePeriodTypeMessages = require('src/messages/timePeriodTypes')
const { timePeriodTypes } = require('src/data/modules/timePeriod/types')

const {
  setTimePeriodType,
  getTimePeriodType
} = require('src/data/ducks/filters')

const CustomSelect = require('src/components/shared/CustomSelect')

const getOptions = intl => (
  timePeriodTypes.map(timePeriodType => ({
    value: timePeriodType,
    label: intl.formatMessage(timePeriodTypeMessages[timePeriodType].adjective)
  }))
)

const mapStateToProps = (state, ownProps) => ({
  name: 'time-period-type-select',
  clearable: false,
  options: getOptions(ownProps.intl),
  value: getTimePeriodType(state)
})

const mapDispatchToProps = dispatch => ({
  onChange: selectedOption => dispatch(setTimePeriodType(selectedOption.value))
})

module.exports = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CustomSelect)
)
