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
    this.changeLocaleInURL()
    this.props.dispatchChangeLocale(this.props.locale)
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

const mapDispatchToProps = (dispatch) => ({
  dispatchChangeLocale (locale) {
    dispatch(setLocale(locale))
    dispatch(updateBudgetItemFilterOptions())
    dispatch(updateBudgetItems())
  }
})

module.exports = connect(null, mapDispatchToProps)(LocaleLink)
