const React = require('react')
const { number, object, oneOfType, string } = React.PropTypes
const FormattedAmount = require('./FormattedAmount')

const GriddleFormattedAmount = props => (
  <FormattedAmount
    amount={props.data}
    {...props.metadata}
    {...props}
  />
)

GriddleFormattedAmount.propTypes = {
  metadata: object,
  data: oneOfType([number, string])
}

module.exports = GriddleFormattedAmount
