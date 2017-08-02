const React = require('react')
const { object, string, shape, func, array } = React.PropTypes
const { addLocaleData, IntlProvider } = require('react-intl')
const { connect } = require('react-redux')

const switchLocale = require('src/data/thunks/switchLocale')

const Layout = require('src/components/Layout/index')

const englishLocaleData = require('node_modules/react-intl/locale-data/en')[0]
const georgianLocaleData = require('node_modules/react-intl/locale-data/ka')[0]

addLocaleData([
  englishLocaleData,
  georgianLocaleData
])

const ConnectedIntlProvider = React.createClass({
  propTypes: {
    children: object.isRequired,
    params: shape({ locale: string.isRequired }),
    switchLocale: func.isRequired,
    location: object.isRequired,
    routes: array.isRequired
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
    const { params, switchLocale } = this.props
    if (params.locale === newLocale) return

    this.changeLocaleInURL(newLocale)
    switchLocale(newLocale)
  },

  handleChangeLocaleEvent (e) {
    this.changeLocale(e.target.value)
  },

  messages () {
    const { locale } = this.props.params

    return require(`locales/${locale}.json`)
  },

  getShareUrl (childrenObject) {
    const routePath = this.props.routes
      .map((m) => { return m.hasOwnProperty('path') ? m.path : null })
      .filter((f) => { return f !== null }).join('/')

    const { pathname, search } = this.props.location

    let sharePath = `${pathname}${search}`
    if (routePath === '/:locale/explore/details/:detailsItemId') {
      sharePath = sharePath.replace('/explore/', '/share/')
    }

    return `${process.env.APP_URL}${sharePath}`
  },
  render () {
    const { locale } = this.props.params
    const { children } = this.props

    return (
      <IntlProvider locale={locale} messages={this.messages()}>
        <Layout children={children} locale={locale} shareUrl={this.getShareUrl()} />
      </IntlProvider>
    )
  }
})

const mapDispatchToProps = (dispatch) => ({
  switchLocale (locale) {
    dispatch(switchLocale(locale))
  }
})

module.exports = connect(null, mapDispatchToProps)(ConnectedIntlProvider)
