const React = require('react')

const Helmet = require('react-helmet')
const Initializers = require('./components/Initializers/index')
const UrlQueryUpdater = require('./components/UrlQueryUpdater')

const ExploreDisplaySelect = require('./components/ExploreDisplaySelect')
const TimePeriodSelect = require('./components/TimePeriodSelect')
const AppErrorsDisplay = require('./components/AppErrorsDisplay')
const ExploreDisplay = require('./components/ExploreDisplay')

const Explore = React.createClass({
  render () {
    return (
      <div>
        <Helmet title='Explore' />
        <Initializers />
        <UrlQueryUpdater />

        <ExploreDisplaySelect />
        <AppErrorsDisplay />
        <TimePeriodSelect />

        <ExploreDisplay />
      </div>
    )
  }
})

module.exports = Explore
