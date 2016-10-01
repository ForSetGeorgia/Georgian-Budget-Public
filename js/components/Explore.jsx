const React = require('react')
const Helmet = require('react-helmet')

const DataDisplay = require('./DataDisplay')
const Filters = require('./Filters')

const Explore = () => (
  <main>
    <Helmet
      title='Explore'
    />

    <Filters />
    <DataDisplay />
  </main>
)

module.exports = Explore
