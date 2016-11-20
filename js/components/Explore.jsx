const React = require('react')
const Helmet = require('react-helmet')

const ExploreDetails = require('js/components/ExploreDetails')
const ExploreList = require('js/components/ExploreList')
const Filters = require('./filters/Filters')

const Explore = React.createClass({
  render () {
    return (
      <div>
        <Helmet
          title='Explore'
        />

        <Filters />
        <div className='gb-Explore-content'>
          <ExploreList />
          <ExploreDetails />
        </div>
      </div>
    )
  }
})

module.exports = Explore
