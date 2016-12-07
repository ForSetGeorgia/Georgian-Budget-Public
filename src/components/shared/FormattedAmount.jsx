const React = require('react')
const { number, oneOfType, string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')

const formatAmount = (amount, intl) => {
  if (amount) {
    return intl.formatNumber(amount)
  } else {
    return ''
  }
}

const FormattedAmount = props => (
  <span>
    {formatAmount(props.data, props.intl)}
  </span>
)

FormattedAmount.propTypes = {
  data: oneOfType([number, string]),
  intl: intlShape
}

module.exports = injectIntl(FormattedAmount)
