const React = require('react')
const { string, func } = React.PropTypes

const LocaleLink = (
  { locale, text, className },
  { handleChangeLocaleEvent, currentLocale }
) => {
  const style = {}
  if (currentLocale === locale) style.display = 'none'

  return (
    <button
      value={locale}
      type='button'
      onClick={handleChangeLocaleEvent}
      style={style}
      className={className}
    >
      {text}
    </button>
  )
}

LocaleLink.propTypes = {
  text: string.isRequired,
  locale: string.isRequired,
  className: string
}

LocaleLink.contextTypes = {
  handleChangeLocaleEvent: func,
  currentLocale: string
}

module.exports = LocaleLink
