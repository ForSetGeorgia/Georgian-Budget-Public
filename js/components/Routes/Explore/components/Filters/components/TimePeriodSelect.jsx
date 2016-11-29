const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedTimePeriod,
  setTimePeriod
 } = require('js/redux/ducks/filters')

const GBSelect = require('./GBSelect')

const TimePeriodSelect = React.createClass({
  propTypes: {
    selectedTimePeriod: string,
    setTimePeriod: func
  },

  allYearsOption () {
    return [{
      value: 'all',
      label: 'All'
    }]
  },

  selectableYears () {
    const selectableYears = ['2012', '2013', '2014', '2015', '2016']

    return selectableYears.map(year => ({
      value: `y${year}`,
      label: year
    }))
  },

  options () {
    return this.allYearsOption().concat(this.selectableYears())
  },

  handleChangeEvent ({ value }) {
    this.props.setTimePeriod(value)
  },

  render () {
    const { selectedTimePeriod } = this.props

    return (
      <GBSelect
        id='time-period-select'
        name='time-period-select'
        handleChangeEvent={this.handleChangeEvent}
        value={selectedTimePeriod}
        options={this.options()}
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(TimePeriodSelect)
