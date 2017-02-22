const React = require('react')
const { func, object } = React.PropTypes
const { injectIntl, defineMessages } = require('react-intl')
const { connect } = require('react-redux')
const { withRouter } = require('react-router')
const CustomSelect = require('src/components/shared/CustomSelect')

const { getYearsWithData } = require('src/data/modules/timePeriod/type/year')
const timePeriodTypeMessages = require('src/messages/timePeriodTypes')

const {
  getSelectedTimePeriods,
  setTimePeriods
 } = require('src/data/ducks/filters')

const { translateTimePeriod } = require('src/data/modules/timePeriod/translate')
const changeQueryOption = require('src/data/modules/changeQueryOption')

const messages = defineMessages({
  allOption: {
    id: 'app.filters.timePeriod.allOption',
    description: 'Text for button that selects all time periods',
    defaultMessage: 'All'
  }
})

const TimePeriodSelect = React.createClass({
  contextTypes: {
    location: object.isRequired
  },

  propTypes: {
    setTimePeriods: func.isRequired,
    router: object.isRequired
  },

  onChange (selectedOption) {
    const { router, setTimePeriods } = this.props
    const { location } = this.context
    const selectedValues = [selectedOption.value]

    changeQueryOption(router, location, { timePeriods: selectedValues })
    setTimePeriods(selectedValues)
  },

  render () {
    return (
      <CustomSelect
        {...this.props}
        onChange={this.onChange}
      />
    )
  }
})

const allYearsOption = intl => (
  [{
    value: 'all',
    label: intl.formatMessage(messages.allOption)
  }]
)

const selectableYears = state => (
  getYearsWithData(state).map(year => ({
    value: year,
    label: translateTimePeriod(year)
  }))
)

const getOptions = (state, intl) => allYearsOption(intl).concat(selectableYears(state))

const getSelectedValue = state => (
  getSelectedTimePeriods(state).length > 0 ? getSelectedTimePeriods(state)[0] : ''
)

const getLabelText = intl => (
  intl.formatMessage(timePeriodTypeMessages.year.noun)
)

const mapStateToProps = (state, ownProps) => ({
  name: 'time-period-select',
  clearable: false,
  options: getOptions(state, ownProps.intl),
  value: getSelectedValue(state),
  labelText: getLabelText(ownProps.intl)
})

const mapDispatchToProps = dispatch => ({
  setTimePeriods: selectedValues => {
    dispatch(setTimePeriods(selectedValues))
  }
})

module.exports = injectIntl(withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimePeriodSelect)
))
