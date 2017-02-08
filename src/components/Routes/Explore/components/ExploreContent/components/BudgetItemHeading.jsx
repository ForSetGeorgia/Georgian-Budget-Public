const React = require('react')
const { connect } = require('react-redux')
const { string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')
const snakeToCamel = require('src/utilities/snakeToCamel')

const { translateTimePeriod } = require('src/data/modules/timePeriod/translate')
const { getSelectedTimePeriods } = require('src/data/ducks/filters')
const { getDetailsItemId } = require('src/data/ducks/explore')
const budgetItemTypeMessages = require('src/messages/budgetItemTypes')

const {
  getBudgetItemName,
  getBudgetItemType
} = require('src/data/modules/entities/budgetItem')

const BudgetItemHeading = ({ name, type, timePeriod, intl }) => {
  const getTranslatedTimePeriod = () => {
    if (!timePeriod || timePeriod === 'all') {
      return ''
    } else {
      return `${translateTimePeriod(timePeriod, intl)} - `
    }
  }

  const getType = () => {
    if (!type || type === 'total') {
      return ''
    } else {
      return `${intl.formatMessage(budgetItemTypeMessages[snakeToCamel(type)].one)}: `
    }
  }

  return (
    <h3 className='gb-BudgetItem-heading'>
      {getTranslatedTimePeriod() +
        getType() +
        name}
    </h3>
  )
}

BudgetItemHeading.propTypes = {
  intl: intlShape,
  name: string.isRequired,
  type: string,
  timePeriod: string
}

const mapStateToProps = state => ({
  name: getBudgetItemName(state, getDetailsItemId(state)),
  type: getBudgetItemType(state, getDetailsItemId(state)),
  timePeriod: getSelectedTimePeriods(state)[0]
})

module.exports = injectIntl(connect(mapStateToProps)(BudgetItemHeading))
