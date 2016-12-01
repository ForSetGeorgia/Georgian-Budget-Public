const React = require('react')
const { object, string, shape, func } = React.PropTypes
const { addLocaleData, IntlProvider } = require('react-intl')
const { connect } = require('react-redux')

const { setLocale } = require('js/redux/ducks/locale')

const Layout = require('js/components/Layout/index')

const ConnectedIntlProvider = React.createClass({
  propTypes: {
    children: object.isRequired,
    params: shape({ locale: string.isRequired }),
    setLocale: func.isRequired,
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
    return {
      location: this.props.location,
      currentLocale: this.props.params.locale,
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

  changeLocale (newLocale) {
    const { params, setLocale } = this.props
    if (params.locale === newLocale) return

    this.changeLocaleInURL(newLocale)
    setLocale(newLocale)
  },

  handleChangeLocaleEvent (e) {
    this.changeLocale(e.target.value)
  },

  messages () {
    const { locale } = this.props.params
    const localeData = require(`node_modules/react-intl/locale-data/${locale}`)

    addLocaleData(localeData)

    return require(`locales/${locale}.json`)
  },

  render () {
    const { locale } = this.props.params
    const { children } = this.props

    return (
      <IntlProvider locale={locale} messages={this.messages()}>
        <Layout children={children} locale={locale} />
      </IntlProvider>
    )
  }
})

const mapDispatchToProps = (dispatch) => ({
  setLocale (locale) {
    dispatch(setLocale(locale))
  }
})

module.exports = connect(null, mapDispatchToProps)(ConnectedIntlProvider)
