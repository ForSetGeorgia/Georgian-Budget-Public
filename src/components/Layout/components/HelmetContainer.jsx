const React = require('react')
const { injectIntl, intlShape } = require('react-intl')
const Helmet = require('react-helmet')

const appMessages = require('src/messages/app')

const HelmetContainer = props => (
  <Helmet
    htmlAttributes={{'lang': props.intl.locale}}
    defaultTitle={props.intl.formatMessage(appMessages.name)}
    titleTemplate={`%s | ${props.intl.formatMessage(appMessages.name)}`}
  />
)

HelmetContainer.propTypes = {
  intl: intlShape.isRequired
}

module.exports = injectIntl(HelmetContainer)
