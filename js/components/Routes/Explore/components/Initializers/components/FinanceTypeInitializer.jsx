const { connect } = require('react-redux')

const { financeTypes } = require('js/redux/entities/finance')

const {
  getSelectedFinanceType,
  setFinanceType
} = require('js/redux/ducks/filters')

const StateInitializer = require('js/components/shared/StateInitializer')

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
