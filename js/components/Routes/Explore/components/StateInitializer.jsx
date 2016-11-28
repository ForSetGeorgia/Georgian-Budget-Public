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

  componentDidMount () {
    const { financeType, setFinanceType } = this.props

    if (financeType) return

    const { financeType: queryFinanceType } = this.context.location.query

    if (['spent_finance', 'planned_finance'].includes(queryFinanceType)) {
      setFinanceType(queryFinanceType)
    } else {
      setFinanceType('spent_finance')
    }
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
