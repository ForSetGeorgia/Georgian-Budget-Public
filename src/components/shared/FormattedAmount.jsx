const React = require('react')
const { bool, number, oneOfType, string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')

const getStyle = props => {
  const { amount, colorAmount } = props
  const style = {}

  if (colorAmount) {
    if (amount < 0) {
      style.color = 'red'
    } else {
      style.color = 'green'
    }
  }

  return style
}

const formatAmount = props => {
  const { amount, intl } = props

  if (amount) {
    return intl.formatNumber(Math.round(amount))
  } else {
    return ''
  }
}

const FormattedAmount = props => (
  <span style={getStyle(props)}>
    {formatAmount(props)}
  </span>
)

FormattedAmount.propTypes = {
  colorAmount: bool,
  amount: oneOfType([number, string]),
  intl: intlShape
}

module.exports = injectIntl(FormattedAmount)
