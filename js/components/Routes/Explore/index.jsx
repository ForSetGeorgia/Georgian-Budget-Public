const React = require('react')
const Helmet = require('react-helmet')

const Filters = require('./components/Filters/index')
const AppErrorsDisplay = require('./components/AppErrorsDisplay')
const ExploreDetails = require('./components/Details/index')
const ExploreList = require('./components/List/index')
const UrlQueryUpdater = require('./components/UrlQueryUpdater')
const StateInitializer = require('./components/StateInitializer')

const Explore = React.createClass({
  render () {
    return (
      <div>
        <Helmet title='Explore' />
        <StateInitializer />
        <UrlQueryUpdater />

        <Filters />
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
