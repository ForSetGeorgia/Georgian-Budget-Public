const React = require('react')
const { bool, number, oneOfType, string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')

const getStyle = props => {
  const { amount, colorAmounts } = props
  const style = {}

  if (colorAmounts) {
    if (amount < 0) {
      style.color = 'red'
    } else {
      style.color = 'green'
    }
  }

  style.fontFamily = "'Roboto Mono', monospace"
  style.justifyContent = 'flex-end'

  return style
}

const formatPresentAmount = props => {
  const { amount, intl, withPlusWhenPositive } = props

  let formatted = intl.formatNumber(Math.round(amount))
  if (withPlusWhenPositive && amount > 0) formatted = `+${formatted}`
  return formatted
}

const formatAmount = props => {
  const { amount } = props

  return amount ? formatPresentAmount(props) : ''
}

const FormattedAmount = props => (
  <span style={getStyle(props)}>
    {formatAmount(props)}
  </span>
)

FormattedAmount.propTypes = {
  colorAmounts: bool,
  amount: oneOfType([number, string]),
  withPlusWhenPositive: bool,
  intl: intlShape
}

module.exports = injectIntl(FormattedAmount)
