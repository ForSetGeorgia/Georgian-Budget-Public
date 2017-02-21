const React = require('react')
const { string } = React.PropTypes

const Helmet = require('react-helmet')

const Meta = React.createClass({
  propTypes: {
    title: string.isRequired,
    url: string.isRequired,
    siteName: string.isRequired,
    shareImage: string.isRequired,
    description: string.isRequired
  },

  render () {
    return (
      <Helmet
        meta={[
          { 'charset': 'UTF-8' },
          { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' },
          { 'property': 'og:title', 'content': this.props.title },
          { 'property': 'og:site_name', 'content': this.props.siteName },
          { 'property': 'og:description', 'content': this.props.description },
          { 'property': 'og:type', 'content': 'website' },
          { 'property': 'og:url', 'content': this.props.url },
          { 'property': 'og:image', 'content': this.props.shareImage }
        ]}
      />
    )
  }
})

module.exports = Meta
