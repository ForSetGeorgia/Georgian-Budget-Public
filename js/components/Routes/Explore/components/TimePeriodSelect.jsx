const React = require('react')
const { func, string } = React.PropTypes
const { injectIntl, defineMessages, intlShape } = require('react-intl')
const { connect } = require('react-redux')

const { getYearsWithData } = require('js/redux/modules/timePeriod/type/year')

const {
  getSelectedTimePeriods,
  setTimePeriods
 } = require('js/redux/ducks/filters')

const { translateTimePeriod } = require('js/redux/modules/timePeriod/translate')

const ButtonSelector = require('js/components/shared/ButtonSelector')

const messages = defineMessages({
  label: {
    id: 'app.filters.timePeriod.label',
    description: 'Label for time period select',
    defaultMessage: 'Year'
  },
  allOption: {
    id: 'app.filters.timePeriod.allOption',
    description: 'Text for button that selects all time periods',
    defaultMessage: 'All'
  }
})

const TimePeriodSelect = React.createClass({
  propTypes: {
    selectedTimePeriod: string,
    setTimePeriods: func,
    intl: intlShape
  },

  allYearsOption () {
    const { intl } = this.props

    return [{
      value: 'all',
      label: intl.formatMessage(messages.allOption)
    }]
  },

  selectableYears () {
    return getYearsWithData().map(year => ({
      value: year,
      label: translateTimePeriod(year)
    }))
  },

  options () {
    return this.allYearsOption().concat(this.selectableYears())
  },

  handleChangeEvent (value) {
    this.props.setTimePeriods([value])
  },

  render () {
    const { intl, selectedTimePeriod } = this.props

    return (
      <ButtonSelector
        handleChangeEvent={this.handleChangeEvent}
        options={this.options()}
        selectedValue={selectedTimePeriod}
        labelText={intl.formatMessage(messages.label)}
      />
    )
  }
})

const mapStateToProps = state => ({
  selectedTimePeriod: getSelectedTimePeriods(state).length > 0 ? getSelectedTimePeriods(state)[0] : ''
})

const mapDispatchToProps = dispatch => ({
  setTimePeriods: value => { dispatch(setTimePeriods(value)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(TimePeriodSelect))
