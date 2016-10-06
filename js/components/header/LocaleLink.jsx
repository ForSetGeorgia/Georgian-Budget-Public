const React = require('react')
const { string, func } = React.PropTypes

const LocaleLinkPresentation = require('./LocaleLinkPresentation')

const LocaleLink = React.createClass({
  contextTypes: {
    changeLocale: func
  },

  propTypes: {
    text: string.isRequired,
    locale: string.isRequired
  },

  changeLocale () {
    this.context.changeLocale(this.props.locale)
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

module.exports = LocaleLink
