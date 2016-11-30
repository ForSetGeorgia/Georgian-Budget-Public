const React = require('react')
const { injectIntl } = require('react-intl')
const { string } = React.PropTypes
const { connect } = require('react-redux')

const { getSelectedExploreDisplay } = require('js/redux/ducks/explore')

const LoadingIndicator = require('js/components/shared/LoadingIndicator')
const ExploreList = require('./List/index')
const ExploreDetails = require('./Details/index')

const ExploreDisplay = React.createClass({
  propTypes: {
    selectedExploreDisplay: string
  },

  isLoading () {
    const { selectedExploreDisplay } = this.props
    return selectedExploreDisplay === ''
  },

  renderSelectedDisplay () {
    const { selectedExploreDisplay } = this.props
    if (selectedExploreDisplay === 'list') {
      return <ExploreList />
    } else {
      return <ExploreDetails />
    }
  },

  render () {
    if (this.isLoading()) return <LoadingIndicator />

    return (
      <div>
        {this.renderSelectedDisplay()}
      </div>
    )
  }
})

const mapStateToProps = state => ({
  selectedExploreDisplay: getSelectedExploreDisplay(state)
})

module.exports = injectIntl(connect(mapStateToProps)(ExploreDisplay))
