const React = require('react')
const { connect } = require('react-redux')
const { func, object, string } = React.PropTypes

const { financeTypes } = require('js/redux/entities/finance')

const {
  getSelectedFinanceType,
  setFinanceType
} = require('js/redux/ducks/filters')

const StateInitializer = React.createClass({
  contextTypes: {
    location: object.isRequired
  },

  propTypes: {
    financeType: string.isRequired,
    setFinanceType: func.isRequired
  },

  defaultFinanceType: 'spent_finance',

  initializeFinanceType () {
    const { setFinanceType } = this.props
    const { financeType: queryFinanceType } = this.context.location.query

    if (financeTypes.includes(queryFinanceType)) {
      setFinanceType(queryFinanceType)
    } else {
      setFinanceType(this.defaultFinanceType)
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
