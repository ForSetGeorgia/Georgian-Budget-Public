const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const { setLocale } = require('js/redux/ducks/locale')

const LocaleInitializer = React.createClass({
  contextTypes: {
    currentLocale: string
  },

  propTypes: {
    setLocale: func
  },

  componentDidMount () {
    this.props.setLocale(this.context.currentLocale)
  },

  render () {
    return null
  }
})

const mapDispatchToProps = (dispatch) => ({
  setLocale (locale) {
    dispatch(setLocale(locale))
  }
})

module.exports = connect(null, mapDispatchToProps)(LocaleInitializer)
