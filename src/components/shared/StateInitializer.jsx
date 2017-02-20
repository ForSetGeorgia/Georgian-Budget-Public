const React = require('react')
const { arrayOf, func, object, string } = React.PropTypes

const StateInitializer = React.createClass({
  contextTypes: {
    location: object
  },

  propTypes: {
    queryTargetName: string.isRequired,
    setTargetValue: func.isRequired,
    selectedTargetValue: string.isRequired,
    defaultTargetValue: string,
    permittedTargetValues: arrayOf(string)
  },

  getQueryTargetValue () {
    return this.context.location.query[this.props.queryTargetName]
  },

  queryTargetValuePermitted () {
    const { permittedTargetValues } = this.props

    if (!permittedTargetValues) return true

    return permittedTargetValues.includes(this.getQueryTargetValue())
  },

  validQueryTargetValue () {
    return this.getQueryTargetValue() && this.queryTargetValuePermitted()
  },

  initializeTargetValue () {
    const {
      setTargetValue,
      defaultTargetValue,
      selectedTargetValue
    } = this.props

    if (selectedTargetValue === this.getQueryTargetValue()) return

    if (this.validQueryTargetValue()) {
      setTargetValue(this.getQueryTargetValue())
    } else if (defaultTargetValue) {
      setTargetValue(defaultTargetValue)
    }
  },

  componentDidUpdate () {
    this.initializeTargetValue()
  },

  componentDidMount () {
    this.initializeTargetValue()
  },

  render () {
    return null
  }
})

module.exports = StateInitializer
