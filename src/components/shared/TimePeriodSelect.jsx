const { injectIntl, defineMessages } = require('react-intl')
const { connect } = require('react-redux')
const CustomSelect = require('src/components/shared/CustomSelect')

const { getYearsWithData } = require('src/data/modules/timePeriod/type/year')
const timePeriodTypeMessages = require('src/messages/timePeriodTypes')

const {
  getSelectedTimePeriods,
  setTimePeriods
 } = require('src/data/ducks/filters')

const { translateTimePeriod } = require('src/data/modules/timePeriod/translate')

const messages = defineMessages({
  allOption: {
    id: 'app.filters.timePeriod.allOption',
    description: 'Text for button that selects all time periods',
    defaultMessage: 'All'
  }
})

const allYearsOption = intl => (
  [{
    value: 'all',
    label: intl.formatMessage(messages.allOption)
  }]
)

const selectableYears = () => (
  getYearsWithData().map(year => ({
    value: year,
    label: translateTimePeriod(year)
  }))
)

const getOptions = intl => allYearsOption(intl).concat(selectableYears())

const getSelectedValue = state => (
  getSelectedTimePeriods(state).length > 0 ? getSelectedTimePeriods(state)[0] : ''
)

const getLabelText = intl => (
  intl.formatMessage(timePeriodTypeMessages.year.noun)
)

const mapStateToProps = (state, ownProps) => ({
  name: 'time-period-select',
  clearable: false,
  options: getOptions(ownProps.intl),
  value: getSelectedValue(state),
  labelText: getLabelText(ownProps.intl)
})

const mapDispatchToProps = dispatch => ({
  onChange: selectedOption => {
    dispatch(setTimePeriods([selectedOption.value]))
  }
})

module.exports = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CustomSelect)
)
