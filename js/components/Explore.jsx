const React = require('react')
const Helmet = require('react-helmet')

const DataDisplay = require('js/components/DataDisplay')
const Filters = require('js/components/Filters')

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
