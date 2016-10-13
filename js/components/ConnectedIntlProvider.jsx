const React = require('react')
const { object, string, shape, func } = React.PropTypes
const { addLocaleData, IntlProvider } = require('react-intl')
const { connect } = require('react-redux')
const {
  setLocale,
  updateBudgetItemFilterOptions,
  updateBudgetItems
} = require('js/actions')

const Layout = require('js/components/Layout')

addLocaleData(require('node_modules/react-intl/locale-data/ka'))

const ConnectedIntlProvider = React.createClass({
  propTypes: {
    children: object.isRequired,
    currentLocale: string.isRequired,
    messages: object.isRequired,
    params: shape({ locale: string.isRequired }),
    dispatchChangeLocale: func.isRequired,
    location: object.isRequired
  },

  contextTypes: {
    router: object
  },

  childContextTypes: {
    location: object,
    currentLocale: string,
    handleChangeLocaleEvent: func
  },

  getChildContext () {
    const currentLocale = this.props.params.locale

    return {
      location: this.props.location,
      currentLocale: currentLocale,
      handleChangeLocaleEvent: this.handleChangeLocaleEvent
    }
  },

  changeLocaleInURL (locale) {
    const { router } = this.context
    const { location } = this.props

    const newPathname = location.pathname.replace(
      /\/\w{2}\//, `/${locale}/`
    )

    if (newPathname === location.pathname) return

    router.push(
      Object.assign(
        {},
        location,
        {
          pathname: newPathname
        }
      )
    )
  },

  changeLocale (locale) {
    const { currentLocale, dispatchChangeLocale } = this.props
    if (currentLocale === locale) return

    this.changeLocaleInURL(locale)
    dispatchChangeLocale(locale)
  },

  handleChangeLocaleEvent (e) {
    this.changeLocale(e.target.value)
  },

  locale () {
    if (this.props.currentLocale) return this.props.currentLocale
    return this.props.params.locale
  },

  messages () {
    return require(`locales/${this.locale()}.json`)
  },

  render () {
    const { children } = this.props

    return (
      <IntlProvider locale={this.locale()} messages={this.messages()}>
        <Layout children={children} locale={this.locale()} />
      </IntlProvider>
    )
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    currentLocale: state.locale,
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchChangeLocale (locale) {
    dispatch(setLocale(locale))
    dispatch(updateBudgetItemFilterOptions())
    dispatch(updateBudgetItems())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConnectedIntlProvider)
