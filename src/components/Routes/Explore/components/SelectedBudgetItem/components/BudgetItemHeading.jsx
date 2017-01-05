const React = require('react')
const { connect } = require('react-redux')
const { string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')

const { translateTimePeriod } = require('src/data/modules/timePeriod/translate')
const { getSelectedTimePeriods } = require('src/data/ducks/filters')
const { getDetailsItemId } = require('src/data/ducks/explore')

const {
  getBudgetItemName
} = require('src/data/modules/entities/budgetItem')

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

const mapStateToProps = state => ({
  name: getBudgetItemName(state, getDetailsItemId(state)),
  timePeriod: getSelectedTimePeriods(state)[0]
})

module.exports = injectIntl(connect(mapStateToProps)(BudgetItemHeading))
