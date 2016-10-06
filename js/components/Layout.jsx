const React = require('react')
const Helmet = require('react-helmet')
const { string, shape, object, func } = React.PropTypes
const { connect } = require('react-redux')
const { setLocale, updateBudgetItemFilterOptions, updateBudgetItems } = require('js/actions')

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
    changeLocale: func
  },

  getChildContext () {
    return {
      location: this.props.location,
      changeLocale: this.changeLocale
    }
  },

  changeLocaleInURL (locale) {
    const { router } = this.context
    const { location } = this.props

    const newPathname = location.pathname.replace(
      /\/\w{2}\//, `/${locale}/`
    )

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

  componentDidMount () {
    const { params, currentLocale } = this.props

    if (params.locale !== currentLocale) this.changeLocale(params.locale)
  },

  render () {
    return (
      <div className='layout'>
        <Helmet
          htmlAttributes={{'lang': this.props.params.locale}}
          title='Home'
          titleTemplate='%s | Georgian Budget'
          link={[
            {'rel': 'stylesheet', 'href': '/public/bundle.css'}
          ]}
        />

        <MetaContainer />
        <Header />

        {this.props.children}
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
    dispatch(updateBudgetItemFilterOptions())
    dispatch(updateBudgetItems())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Layout)
