const React = require('react')

const Error = (props) => (
  <p>
    {props.text}
  </p>
)

const { string } = React.PropTypes

Error.propTypes = {
  text: string.isRequired
}

module.exports = Error
