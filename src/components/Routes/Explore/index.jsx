const React = require('react')

const Initializers = require('./components/Initializers/index')
const UrlQueryUpdater = require('./components/UrlQueryUpdater')

const AppErrorsDisplay = require('./components/AppErrorsDisplay')
const ExploreContent = require('./components/ExploreContent/index')

const Explore = React.createClass({
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

module.exports = Explore
