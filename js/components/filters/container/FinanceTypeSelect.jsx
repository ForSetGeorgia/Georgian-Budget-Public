const React = require('react')
const { object, string, func } = React.PropTypes
const { connect } = require('react-redux')
const { setFinanceType, updateBudgetItems } = require('js/actions')
const getLocationWithQuery = require('js/helpers/getLocationWithQuery')
const FinanceTypeSelect = require('../presentation/FinanceTypeSelect')

const Container = React.createClass({
  contextTypes: {
    router: object,
    location: object
  },

  propTypes: {
    dispatchNewFinanceType: func.isRequired,
    value: string.isRequired,
    queryValue: string
  },

  defaultValue: 'spent_finance',

  options: [
    { value: 'spent_finance', label: 'დახარჯული ფინანსები' },
    { value: 'planned_finance', label: 'დაგეგმილი ფინანსები' }
  ],

  get optionValues () {
    return this.options.map((option) => option.value)
  },

  handleChangeEvent (selected) {
    const { value } = selected
    this.props.dispatchNewFinanceType(value)

    this.context.router.push(
      getLocationWithQuery(
        this.context.location,
        {
          financeType: value
        }
      )
    )
  },

  componentDidMount () {
    const { queryValue } = this.props

    if (this.optionValues.includes(queryValue)) {
      this.handleChangeEvent({ value: queryValue })
    } else {
      this.handleChangeEvent({ value: this.defaultValue })
    }
  },

  render () {
    return (
      <FinanceTypeSelect
        handleChange={this.handleChangeEvent}
        value={this.props.value}
        options={this.options}
      />
    )
  }
})

const mapStateToProps = (state) => {
  const { locationBeforeTransitions } = state.routing

  return {
    value: state.filters.financeType.value,
    queryValue: ((locationBeforeTransitions || {}).query || {}).financeType
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchNewFinanceType (value) {
    dispatch(setFinanceType(value))
    dispatch(updateBudgetItems())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Container)
