const React = require('react')
const Helmet = require('react-helmet')
const { object } = React.PropTypes

const DataDisplay = require('js/components/DataDisplay')
const Filters = require('./filters/Filters')

const Explore = React.createClass({
  propTypes: {
    location: object
  },

  childContextTypes: {
    location: object
  },

  getChildContext () {
    return { location: this.props.location }
  },

  render () {
    return (
      <main>
        <Helmet
          title='Explore'
        />

        <Filters />
        <DataDisplay />
      </main>
    )
  }
})

module.exports = Explore
