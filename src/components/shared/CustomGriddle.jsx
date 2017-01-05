const React = require('react')
const Griddle = require('griddle-react')

const CustomGriddle = props => (
  <Griddle
    rowMetadata={{ bodyCssClassName: 'gb-Table-row mod-darker-if-odd' }}
    {...props}
  />
)

module.exports = CustomGriddle
