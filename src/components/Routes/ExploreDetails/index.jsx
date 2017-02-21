const React = require('react')
const { func, shape, string } = React.PropTypes
const { connect } = require('react-redux')

const switchDetailsItemId = require('src/data/thunks/switchDetailsItemId')
const { getDetailsItemId } = require('src/data/ducks/explore')

const Initializers = require('./components/Initializers/index')

const AppErrorsDisplay = require('./components/AppErrorsDisplay')
const ExploreContent = require('./components/ExploreContent/index')
const UrlQueryUpdater = require('./components/UrlQueryUpdater')

const Explore = React.createClass({
  propTypes: {
    routeParams: shape({
      detailsItemId: string
    }),
    switchDetailsItemId: func,
    detailsItemId: string
  },

  updateItemIdFromURL () {
    const { detailsItemId, switchDetailsItemId, routeParams } = this.props

    if (detailsItemId !== routeParams.detailsItemId) {
      switchDetailsItemId(routeParams.detailsItemId)
    }
  },

  componentDidUpdate () {
    this.updateItemIdFromURL()
  },

  componentDidMount () {
    this.updateItemIdFromURL()
  },

  render () {
    return (
      <div>
        <Initializers />
        <UrlQueryUpdater />

        <AppErrorsDisplay />

        <ExploreContent />
      </div>
    )
  }
})

const mapStateToProps = state => ({
  detailsItemId: getDetailsItemId(state)
})

const mapDispatchToProps = dispatch => ({
  switchDetailsItemId: detailsItemId => (
    dispatch(switchDetailsItemId(detailsItemId))
  )
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Explore)
