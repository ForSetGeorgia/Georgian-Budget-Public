const React = require('react')
const { addLocaleData, IntlProvider } = require('react-intl')
const { connect } = require('react-redux')

addLocaleData(require('node_modules/react-intl/locale-data/ka'))

const ConnectedIntlProvider = (props) => (
  <IntlProvider locale={props.locale} messages={props.messages}>
    {props.children}
  </IntlProvider>
)

const { object, string } = React.PropTypes

ConnectedIntlProvider.propTypes = {
  children: object,
  locale: string,
  messages: object
}

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
    messages: state.messages
  }
}

module.exports = connect(mapStateToProps)(ConnectedIntlProvider)
