const React = require('react')

const Helmet = require('react-helmet')
const Initializers = require('./components/Initializers/index')
const UrlQueryUpdater = require('./components/UrlQueryUpdater')

const TimePeriodSelect = require('./components/TimePeriodSelect')
const AppErrorsDisplay = require('./components/AppErrorsDisplay')
const ExploreDetails = require('./components/Details/index')

const Explore = React.createClass({
  render () {
    return (
      <div>
        <Helmet title='Explore' />
        <Initializers />
        <UrlQueryUpdater />

        <AppErrorsDisplay />
        <TimePeriodSelect />

        <ExploreDetails />
      </div>
    )
  }
})

module.exports = Explore
