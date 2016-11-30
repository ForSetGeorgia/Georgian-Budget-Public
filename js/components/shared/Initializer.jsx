const React = require('react')
const { func, object, string } = React.PropTypes

const Initializer = React.createClass({
  contextTypes: {
    location: object
  },

  propTypes: {
    queryTargetName: string.isRequired,
    setTargetValue: func.isRequired,
    selectedTargetValue: string.isRequired,
    defaultTargetValue: string
  },

  getQueryTargetValue () {
    return this.context.location.query[this.props.queryTargetName]
  },

  initializeTargetValue () {
    const {
      setTargetValue,
      defaultTargetValue
    } = this.props

    const queryTargetValue = this.getQueryTargetValue()

    if (queryTargetValue) {
      setTargetValue(queryTargetValue)
    } else if (defaultTargetValue) {
      setTargetValue(defaultTargetValue)
    }
  },

  componentDidMount () {
    const { selectedTargetValue } = this.props
    if (selectedTargetValue) return
    this.initializeTargetValue()
  },

  render () {
    return null
  }
})

module.exports = Initializer
