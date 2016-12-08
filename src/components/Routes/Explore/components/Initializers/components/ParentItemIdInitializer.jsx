const { connect } = require('react-redux')

const {
  getParentItemId,
  setParentItemId
} = require('src/data/ducks/explore')

const StateInitializer = require('src/components/shared/StateInitializer')

const mapStateToProps = state => ({
  selectedTargetValue: getParentItemId(state),
  queryTargetName: 'parentItemId',
  defaultTargetValue: '8b03adb43773622088d7291c38fbf87b82cbe626'
})

const mapDispatchToProps = dispatch => ({
  setTargetValue (value) {
    dispatch(setParentItemId(value))
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(StateInitializer)
