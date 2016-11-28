const React = require('react')
const { connect } = require('react-redux')
const { func, object, string } = React.PropTypes

const {
  getSelectedFinanceType,
  setFinanceType
} = require('js/redux/ducks/filters/financeType')

const StateInitializer = React.createClass({
  contextTypes: {
    location: object.isRequired
  },

  propTypes: {
    financeType: string.isRequired,
    setFinanceType: func.isRequired
  },

  initializeFinanceType () {
    const { setFinanceType } = this.props
    const { financeType: queryFinanceType } = this.context.location.query

    if (['spent_finance', 'planned_finance'].includes(queryFinanceType)) {
      setFinanceType(queryFinanceType)
    } else {
      setFinanceType('spent_finance')
    }
  },

  componentDidMount () {
    const { financeType } = this.props
    if (!financeType) this.initializeFinanceType()
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  financeType: getSelectedFinanceType(state)
})

const mapDispatchToProps = dispatch => ({
  setFinanceType (value) {
    dispatch(setFinanceType(value))
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(StateInitializer)
