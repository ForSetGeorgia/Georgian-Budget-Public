const React = require('react')
const { string } = React.PropTypes
const Helmet = require('react-helmet')

const HelmetContainer = props => (
  <Helmet
    htmlAttributes={{'lang': props.locale}}
    title='Home'
    titleTemplate='%s | Georgian Budget'
  />
)

HelmetContainer.propTypes = {
  locale: string.isRequired
}

module.exports = HelmetContainer
