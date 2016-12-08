const React = require('react')
const { number, object, oneOfType, string } = React.PropTypes
const FormattedAmount = require('./FormattedAmount')

const GriddleFormattedAmount = props => (
  <FormattedAmount
    amount={props.data}
    colorAmount={props.metadata.colorAmounts}
    {...props}
  />
)

GriddleFormattedAmount.propTypes = {
  metadata: object,
  data: oneOfType([number, string])
}

module.exports = GriddleFormattedAmount
