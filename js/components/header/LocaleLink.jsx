const React = require('react')
const { object, string } = React.PropTypes

const LocaleLinkPresentation = require('./LocaleLinkPresentation')

const LocaleLink = React.createClass({
  contextTypes: {
    location: object
  },

  propTypes: {
    text: string.isRequired,
    locale: string.isRequired
  },

  currentUrlWithLocale (locale) {
    const { pathname, search } = this.context.location

    const newPathname = pathname.replace(/\/\w{2}\//, `/${locale}/`)
    return `${newPathname}${search}`
  },

  render () {
    return (
      <LocaleLinkPresentation
        currentUrlWithLocale={this.currentUrlWithLocale}
        text={this.props.text}
        locale={this.props.locale}
      />
    )
  }
})

module.exports = LocaleLink
