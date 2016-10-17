const React = require('react')
const { object, string, shape, func } = React.PropTypes
const { addLocaleData, IntlProvider } = require('react-intl')
const { connect } = require('react-redux')
const {
  updateBudgetItemFilterOptions,
  updateBudgetItems
} = require('js/actions')

const { setLocale } = require('js/ducks/locale')

const Layout = require('js/components/Layout')

addLocaleData(require('node_modules/react-intl/locale-data/ka'))

const ConnectedIntlProvider = React.createClass({
  propTypes: {
    children: object.isRequired,
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
    const { params, dispatchChangeLocale } = this.props
    if (params.locale === newLocale) return

    this.changeLocaleInURL(newLocale)
    dispatchChangeLocale(newLocale)
  },

  componentDidMount () {
    this.props.dispatchChangeLocale(this.props.params.locale)
  },

  handleChangeLocaleEvent (e) {
    this.changeLocale(e.target.value)
  },

  messages () {
    return require(`locales/${this.props.params.locale}.json`)
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
  dispatchChangeLocale (locale) {
    dispatch(setLocale(locale))
    dispatch(updateBudgetItemFilterOptions())
    dispatch(updateBudgetItems())
  }
})

module.exports = connect(null, mapDispatchToProps)(ConnectedIntlProvider)
