const React = require('react')
const { func, string } = React.PropTypes
const { injectIntl, defineMessages, intlShape } = require('react-intl')
const { connect } = require('react-redux')

const {
  getSelectedTimePeriod,
  setTimePeriod
 } = require('js/redux/ducks/filters')

const ButtonSelector = require('js/components/shared/ButtonSelector')

const messages = defineMessages({
  label: {
    id: 'app.filters.timePeriod.label',
    description: 'Label for time period select',
    defaultMessage: 'Year'
  }
})

const TimePeriodSelect = React.createClass({
  propTypes: {
    selectedTimePeriod: string,
    setTimePeriod: func,
    intl: intlShape
  },

  allYearsOption () {
    return [{
      value: 'all',
      label: 'All'
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
    this.props.setTimePeriod(value)
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
  selectedTimePeriod: getSelectedTimePeriod(state)
})

const mapDispatchToProps = dispatch => ({
  setTimePeriod: value => { dispatch(setTimePeriod(value)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(TimePeriodSelect))
