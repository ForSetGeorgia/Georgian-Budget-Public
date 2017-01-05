const React = require('react')
const Griddle = require('griddle-react')

const CustomGriddle = props => (
  <Griddle
    tableClassName='gb-Table'
    rowMetadata={{ bodyCssClassName: 'gb-Table-row mod-darker-if-odd' }}
    useGriddleStyles={false}
    {...props}
  />
)

module.exports = CustomGriddle
