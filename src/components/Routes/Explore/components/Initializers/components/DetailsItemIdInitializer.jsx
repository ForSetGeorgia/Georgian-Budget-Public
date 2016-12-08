const { connect } = require('react-redux')

const {
  getDetailsItemId,
  setDetailsItemId
} = require('src/data/ducks/explore')

const StateInitializer = require('src/components/shared/StateInitializer')

const mapStateToProps = state => ({
  selectedTargetValue: getDetailsItemId(state),
  queryTargetName: 'detailsItemId',
  defaultTargetValue: '8b03adb43773622088d7291c38fbf87b82cbe626'
})

const mapDispatchToProps = dispatch => ({
  setTargetValue (value) {
    dispatch(setDetailsItemId(value))
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(StateInitializer)
