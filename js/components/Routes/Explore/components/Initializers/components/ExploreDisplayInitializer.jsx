const { connect } = require('react-redux')

const {
  setExploreDisplay,
  getSelectedExploreDisplay
 } = require('js/redux/ducks/explore')

const Initializer = require('js/components/shared/Initializer')

const mapStateToProps = state => ({
  queryTargetName: 'exploreDisplay',
  selectedTargetValue: getSelectedExploreDisplay(state),
  defaultTargetValue: 'details'
})

const mapDispatchToProps = dispatch => ({
  setTargetValue: value => { dispatch(setExploreDisplay(value)) }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Initializer)
