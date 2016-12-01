const { connect } = require('react-redux')

const {
  setExploreDisplay,
  getSelectedExploreDisplay
} = require('js/data/ducks/explore')

const StateInitializer = require('js/components/shared/StateInitializer')

const mapStateToProps = state => ({
  queryTargetName: 'exploreDisplay',
  selectedTargetValue: getSelectedExploreDisplay(state),
  defaultTargetValue: 'details'
})

const mapDispatchToProps = dispatch => ({
  setTargetValue: value => { dispatch(setExploreDisplay(value)) }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(StateInitializer)
