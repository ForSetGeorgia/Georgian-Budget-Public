const React = require('react')
const { number } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')

const FormattedAmount = props => (
  <span>{props.intl.formatNumber(props.data)}</span>
)

FormattedAmount.propTypes = {
  data: number,
  intl: intlShape
}

module.exports = injectIntl(FormattedAmount)
