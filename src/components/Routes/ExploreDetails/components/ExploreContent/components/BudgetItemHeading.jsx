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

  const getPrimaryHeaderMarkup = () => (
    getTranslatedTimePeriod() + name
  )

  const getTypeMarkup = () => {
    if (!type || type === 'total') {
      return ''
    } else {
      return (
        <span className='gb-BudgetItemHeading-subheading-item'>
          {intl.formatMessage(budgetItemMessages.type)}:
          <span className='gb-BudgetItemHeading-subheading-item-value'>
            {intl.formatMessage(budgetItemTypeMessages[snakeToCamel(type)].one)}
          </span>
        </span>
      )
    }
  }

  const getCodeMarkup = () => {
    if (!code) {
      return ''
    } else {
      return (
        <span className='gb-BudgetItemHeading-subheading-item'>
          {intl.formatMessage(budgetItemMessages.code)}:
          <span className='gb-BudgetItemHeading-subheading-item-value'>
            {code}
          </span>
        </span>
      )
    }
  }

  const getSubHeaderMarkup = () => {
    if (!getCodeMarkup() && !getTypeMarkup()) {
      return ''
    } else {
      return (
        <small className='gb-BudgetItemHeading-subheading'>
          {getTypeMarkup()}
          {getCodeMarkup()}
        </small>
      )
    }
  }

  const getBreak = () => (
    getSubHeaderMarkup() ? <br /> : ''
  )

  return (
    <h3 className='gb-BudgetItemHeading'>
      {getPrimaryHeaderMarkup()}
      {getBreak()}
      {getSubHeaderMarkup()}
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
