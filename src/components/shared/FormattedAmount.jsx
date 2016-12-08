const React = require('react')
const { number, oneOfType, string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')

const colorAmount = props => props.metadata.colorAmounts

const getStyle = props => {
  const { data } = props
  const style = {}

  if (colorAmount(props)) {
    if (data < 0) {
      style.color = 'red'
    } else {
      style.color = 'green'
    }
  }

  return style
}

const formatAmount = props => {
  const { data, intl } = props

  if (data) {
    return intl.formatNumber(data)
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
  data: oneOfType([number, string]),
  intl: intlShape
}

module.exports = injectIntl(FormattedAmount)
