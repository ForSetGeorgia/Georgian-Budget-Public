const React = require('react')
const { string, func } = React.PropTypes
const { Link } = require('react-router')

const LocaleLink = (props) => (
  <Link to={props.currentUrlWithLocale(props.locale)}>
    {props.text}
  </Link>
)

LocaleLink.propTypes = {
  text: string.isRequired,
  currentUrlWithLocale: func.isRequired,
  locale: string.isRequired
}

module.exports = LocaleLink
