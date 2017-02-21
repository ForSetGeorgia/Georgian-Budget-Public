const React = require('react')
const { injectIntl, intlShape } = require('react-intl')
const { string } = React.PropTypes

const appMessages = require('src/messages/app')

const Helmet = require('react-helmet')

const Meta = React.createClass({
  propTypes: {
    title: string.isRequired,
    url: string.isRequired,
    intl: intlShape.isRequired,
    siteName: string.isRequired
  },

  description () {
    const { intl } = this.props

    return intl.formatMessage(appMessages.description)
  },

  shareImage () {
    const { intl } = this.props

    if (intl.locale === 'en') {
      return require('public/images/share_en.jpg')
    } else if (intl.locale === 'ka') {
      return require('public/images/share_ka.jpg')
    }
  },

  render () {
    return (
      <Helmet
        meta={[
          { 'charset': 'UTF-8' },
          { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' },
          { 'property': 'og:title', 'content': this.props.title },
          { 'property': 'og:site_name', 'content': this.props.siteName },
          { 'property': 'og:description', 'content': this.description() },
          { 'property': 'og:type', 'content': 'website' },
          { 'property': 'og:url', 'content': this.props.url },
          { 'property': 'og:image', 'content': this.shareImage() }
        ]}
      />
    )
  }
})

module.exports = injectIntl(Meta)
