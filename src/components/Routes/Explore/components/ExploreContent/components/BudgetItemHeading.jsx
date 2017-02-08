const React = require('react')
const { connect } = require('react-redux')
const { string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')
const snakeToCamel = require('src/utilities/snakeToCamel')

const { translateTimePeriod } = require('src/data/modules/timePeriod/translate')
const { getSelectedTimePeriods } = require('src/data/ducks/filters')
const { getDetailsItemId } = require('src/data/ducks/explore')

const budgetItemTypeMessages = require('src/messages/budgetItemTypes')
const budgetItemMessages = require('src/messages/budgetItem')

const {
  getBudgetItemName,
  getBudgetItemType,
  getBudgetItemCode
} = require('src/data/modules/entities/budgetItem')

const BudgetItemHeading = ({ name, type, timePeriod, intl, code }) => {
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

  const getSecondLineMarkup = () => {
    if (!code) {
      return ''
    } else {
      return (
        <small>
          {intl.formatMessage(budgetItemMessages.code)}: {code}
        </small>
      )
    }
  }

  const getBreak = () => (
    getSecondLineMarkup() ? <br /> : ''
  )

  return (
    <h3 className='gb-BudgetItem-heading'>
      {getTranslatedTimePeriod() +
        getType() +
        name
      }
      {getBreak()}
      {getSecondLineMarkup()}
    </h3>
  )
}

BudgetItemHeading.propTypes = {
  intl: intlShape,
  name: string.isRequired,
  type: string,
  timePeriod: string,
  code: string
}

const mapStateToProps = state => ({
  name: getBudgetItemName(state, getDetailsItemId(state)),
  type: getBudgetItemType(state, getDetailsItemId(state)),
  timePeriod: getSelectedTimePeriods(state)[0],
  code: getBudgetItemCode(state, getDetailsItemId(state))
})

module.exports = injectIntl(connect(mapStateToProps)(BudgetItemHeading))
