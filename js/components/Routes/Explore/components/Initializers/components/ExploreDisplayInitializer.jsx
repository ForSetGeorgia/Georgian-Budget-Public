const React = require('react')
const { func, object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  setExploreDisplay,
  getSelectedExploreDisplay
 } = require('js/redux/ducks/explore')

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

const mapStateToProps = state => ({
  queryTargetName: 'exploreDisplay',
  selectedTargetValue: getSelectedExploreDisplay(state),
  defaultTargetValue: 'details'
})

const mapDispatchToProps = dispatch => ({
  setTargetValue: value => { dispatch(setExploreDisplay(value)) }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Initializer)
