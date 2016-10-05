const React = require('react')
const { string, func } = React.PropTypes

const LocaleLinkPresentation = require('./LocaleLinkPresentation')

const LocaleLink = React.createClass({
  propTypes: {
    text: string.isRequired,
    currentUrlWithLocale: func.isRequired,
    locale: string.isRequired
  },

  render () {
    return (
      <LocaleLinkPresentation
        currentUrlWithLocale={this.props.currentUrlWithLocale}
        text={this.props.text}
        locale={this.props.locale}
      />
    )
  }
})

module.exports = LocaleLink
