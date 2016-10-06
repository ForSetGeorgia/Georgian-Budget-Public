const React = require('react')
const { object, string, func } = React.PropTypes
const { connect } = require('react-redux')

const { setLocale, updateBudgetItemFilterOptions, updateBudgetItems } = require('js/actions')

const LocaleLinkPresentation = require('./LocaleLinkPresentation')

const LocaleLink = React.createClass({
  contextTypes: {
    router: object,
    location: object
  },

  propTypes: {
    text: string.isRequired,
    locale: string.isRequired,
    currentLocale: string.isRequired,
    dispatchChangeLocale: func.isRequired
  },

  changeLocaleInURL () {
    const { location, router } = this.context

    const newPathname = location.pathname.replace(
      /\/\w{2}\//, `/${this.props.locale}/`
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

  changeLocale () {
    const { currentLocale, locale, dispatchChangeLocale } = this.props
    if (currentLocale === locale) return

    this.changeLocaleInURL()
    dispatchChangeLocale(locale)
  },

  render () {
    return (
      <LocaleLinkPresentation
        changeLocale={this.changeLocale}
        text={this.props.text}
        locale={this.props.locale}
      />
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(LocaleLink)
