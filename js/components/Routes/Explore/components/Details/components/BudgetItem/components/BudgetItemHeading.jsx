const React = require('react')
const { string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')

const { translateTimePeriod } = require('js/redux/modules/timePeriod/translate')

const BudgetItemHeading = ({ name, timePeriod, intl }) => {
  let title = ''

  if (timePeriod && timePeriod !== 'all') {
    title += `${translateTimePeriod(timePeriod, intl)} - `
  }
  title += name

  return (
    <h3 className='gb-BudgetItem-heading'>
      {title}
    </h3>
  )
}

BudgetItemHeading.propTypes = {
  intl: intlShape,
  name: string.isRequired,
  timePeriod: string
}

module.exports = injectIntl(BudgetItemHeading)
