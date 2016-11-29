const React = require('react')
const { func, string } = React.PropTypes
const { injectIntl, defineMessages, intlShape } = require('react-intl')
const { connect } = require('react-redux')

const {
  getSelectedTimePeriods,
  setTimePeriods
 } = require('js/redux/ducks/filters')

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
    const selectableYears = ['2016', '2015', '2014', '2013', '2012']

    return selectableYears.map(year => ({
      value: `y${year}`,
      label: year
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
