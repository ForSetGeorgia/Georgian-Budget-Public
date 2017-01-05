const React = require('react')

const Helmet = require('react-helmet')
const Initializers = require('./components/Initializers/index')
const UrlQueryUpdater = require('./components/UrlQueryUpdater')

const AppErrorsDisplay = require('./components/AppErrorsDisplay')
const ExploreContent = require('./components/ExploreContent/index')

const Explore = React.createClass({
  render () {
    return (
      <div>
        <Helmet title='Explore' />
        <Initializers />
        <UrlQueryUpdater />

        <AppErrorsDisplay />

        <ExploreContent />
      </div>
    )
  }
})

module.exports = Explore
