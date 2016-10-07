// Svg.js
const React = require('react')
const { string } = React.PropTypes

const Svg = (props) => (
  <span
    dangerouslySetInnerHTML={{ __html: props.markup }}
    className={props.className}
  />
)

Svg.propTypes = {
  markup: string.isRequired,
  className: string
}

module.exports = Svg
