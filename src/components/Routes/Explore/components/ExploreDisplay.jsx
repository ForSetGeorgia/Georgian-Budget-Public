const React = require('react')

const ExploreList = require('./List/index')
const ExploreDetails = require('./Details/index')

const ExploreDisplay = React.createClass({
  render () {
    return (
      <div>
        <ExploreDetails />
        <ExploreList />
      </div>
    )
  }
})

module.exports = ExploreDisplay
