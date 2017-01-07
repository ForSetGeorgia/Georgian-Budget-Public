const React = require('react')
const { string } = React.PropTypes
const Griddle = require('griddle-react')

const CustomGriddle = props => (
  <Griddle
    rowMetadata={{ bodyCssClassName: 'gb-Table-row mod-darker-if-odd' }}
    useGriddleStyles={false}
    {...props}
  />
)

CustomGriddle.propTypes = {
  modTableClassName: string
}

module.exports = CustomGriddle
