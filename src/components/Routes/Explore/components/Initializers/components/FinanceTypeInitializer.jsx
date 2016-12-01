const { connect } = require('react-redux')

const { financeTypes } = require('src/data/modules/entities/finance')

const {
  getSelectedFinanceType,
  setFinanceType
} = require('src/data/ducks/filters')

const StateInitializer = require('src/components/shared/StateInitializer')

const mapStateToProps = state => ({
  selectedTargetValue: getSelectedFinanceType(state),
  queryTargetName: 'financeType',
  defaultTargetValue: 'spent_finance',
  permittedTargetValues: financeTypes
})

const mapDispatchToProps = dispatch => ({
  setTargetValue (value) {
    dispatch(setFinanceType(value))
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(StateInitializer)
