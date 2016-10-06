const React = require('react')
const { string, func } = React.PropTypes

const LocaleLink = (props) => (
  <button type='button' onClick={props.changeLocale}>
    {props.text}
  </button>
)

LocaleLink.propTypes = {
  text: string.isRequired,
  changeLocale: func.isRequired
}

module.exports = LocaleLink
