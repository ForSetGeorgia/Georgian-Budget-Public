const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { financeTypes } = require('src/data/modules/entities/finance')

const {
  getSelectedFinanceType,
  setFinanceType
} = require('src/data/ducks/filters')

const StateInitializer = require('src/components/shared/StateInitializer')

const mapStateToProps = state => ({
  selectedTargetValue: getSelectedFinanceType(state),
  queryTargetName: 'financeType',
  defaultTargetValue: 'spentFinance',
  permittedTargetValues: financeTypes
})

const mapDispatchToProps = dispatch => ({
  setTargetValue (value) {
    dispatch(setFinanceType(value))
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(StateInitializer))
