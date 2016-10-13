const React = require('react')
const Helmet = require('react-helmet')
const { string, shape, object, func } = React.PropTypes
const { connect } = require('react-redux')
const {
  setLocale,
  setMessages,
  updateBudgetItemFilterOptions,
  updateBudgetItems
} = require('js/actions')

const MetaContainer = require('js/components/MetaContainer')
const Header = require('js/components/Header')

const Layout = React.createClass({
  contextTypes: {
    router: object
  },

  propTypes: {
    location: object.isRequired,
    children: object.isRequired,
    params: shape({ locale: string }),
    dispatchChangeLocale: func.isRequired,
    currentLocale: string
  },

  childContextTypes: {
    location: object,
    currentLocale: string,
    handleChangeLocaleEvent: func
  },

  getChildContext () {
    let currentLocale
    if (this.props.currentLocale) {
      currentLocale = this.props.currentLocale
    } else {
      currentLocale = this.props.params.locale
    }

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

  componentDidMount () {
    const { params, currentLocale } = this.props

    if (params.locale !== currentLocale) this.changeLocale(params.locale)
  },

  render () {
    return (
      <div>
        <Helmet
          htmlAttributes={{'lang': this.props.params.locale}}
          title='Home'
          titleTemplate='%s | Georgian Budget'
          link={[
            {'rel': 'stylesheet', 'href': '/public/bundles/bundle.css'}
          ]}
        />

        <MetaContainer />
        <Header />

        <main className='main-content'>
          {this.props.children}
        </main>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  currentLocale: state.locale
})

const mapDispatchToProps = (dispatch) => ({
  dispatchChangeLocale (locale) {
    dispatch(setLocale(locale))
    const messages = require(`locales/${locale}.json`)

    dispatch(setMessages(messages))
    dispatch(updateBudgetItemFilterOptions())
    dispatch(updateBudgetItems())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Layout)
