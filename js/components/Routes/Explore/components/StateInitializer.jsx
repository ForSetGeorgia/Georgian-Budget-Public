const React = require('react')
const { connect } = require('react-redux')
const { func, object } = React.PropTypes

const { setFinanceType } = require('js/redux/ducks/filters/financeType')

const StateInitializer = React.createClass({
  contextTypes: {
    location: object
  },

  propTypes: {
    setFinanceType: func
  },

  componentDidMount () {
    const { setFinanceType } = this.props
    const { financeType } = this.context.location.query
    if (['spent_finance', 'planned_finance'].includes(financeType)) {
      setFinanceType(financeType)
    } else {
      setFinanceType('spent_finance')
    }
  },

  render () {
    return null
  }
})

const mapDispatchToProps = dispatch => ({
  setFinanceType (value) {
    dispatch(setFinanceType(value))
  }
})

module.exports = connect(null, mapDispatchToProps)(StateInitializer)
