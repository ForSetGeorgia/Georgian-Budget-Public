const React = require('react')
const Helmet = require('react-helmet')

const DataDisplay = require('js/components/DataDisplay')
const Filters = require('./filters/Filters')

const Explore = React.createClass({
  render () {
    return (
      <div>
        <Helmet
          title='Explore'
        />

        <Filters />
        <DataDisplay />
      </div>
    )
  }
})

module.exports = Explore
