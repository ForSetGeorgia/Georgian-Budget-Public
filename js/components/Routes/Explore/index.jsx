const React = require('react')

const Helmet = require('react-helmet')
const Initializers = require('./components/Initializers/index')
const UrlQueryUpdater = require('./components/UrlQueryUpdater')

const ExploreDisplaySelect = require('./components/ExploreDisplaySelect')
const TimePeriodSelect = require('./components/TimePeriodSelect')
const AppErrorsDisplay = require('./components/AppErrorsDisplay')
const ExploreList = require('./components/List/index')
const ExploreDetails = require('./components/Details/index')

const Explore = React.createClass({
  render () {
    return (
      <div>
        <Helmet title='Explore' />
        <Initializers />
        <UrlQueryUpdater />

        <ExploreDisplaySelect />
        <TimePeriodSelect />
        <AppErrorsDisplay />

        <div className='gb-Explore-content'>
          <ExploreList />
          <ExploreDetails />
        </div>
      </div>
    )
  }
})

module.exports = Explore
