const React = require('react')
const { string, func } = React.PropTypes

const LocaleLink = ({ locale, text }, { handleChangeLocaleEvent }) => (
  <button value={locale} type='button' onClick={handleChangeLocaleEvent}>
    {text}
  </button>
)

LocaleLink.propTypes = {
  text: string.isRequired,
  locale: string.isRequired
}

LocaleLink.contextTypes = {
  handleChangeLocaleEvent: func
}

module.exports = LocaleLink
