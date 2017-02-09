const React = require('react')
const { string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')
const Helmet = require('react-helmet')

const appMessages = require('src/messages/app')

const HelmetContainer = props => (
  <Helmet
    htmlAttributes={{'lang': props.locale}}
    title='Home'
    titleTemplate={`%s | ${props.intl.formatMessage(appMessages.name)}`}
  />
)

HelmetContainer.propTypes = {
  locale: string.isRequired,
  intl: intlShape.isRequired
}

module.exports = injectIntl(HelmetContainer)
