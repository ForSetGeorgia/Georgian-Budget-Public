const React = require('react')
const Helmet = require('react-helmet')

const Meta = (props) => (
  <Helmet
    meta={[
      { 'charset': 'UTF-8' },
      { 'property': 'og:url', 'content': props.url },
      { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' }
    ]}
  />
  
)

const { string } = React.PropTypes

Meta.propTypes = {
  url: string.isRequired
}

module.exports = Meta
