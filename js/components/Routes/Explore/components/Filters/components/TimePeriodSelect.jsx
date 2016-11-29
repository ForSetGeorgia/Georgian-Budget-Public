const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedTimePeriod,
  setTimePeriod
 } = require('js/redux/ducks/filters')

const ButtonSelector = require('js/components/shared/ButtonSelector')

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
    const { selectedTimePeriod } = this.props

    return (
      <ButtonSelector
        handleChangeEvent={this.handleChangeEvent}
        options={this.options()}
        selectedValue={selectedTimePeriod}
        labelText='Year'
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
