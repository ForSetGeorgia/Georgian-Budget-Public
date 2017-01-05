const React = require('react')

const Helmet = require('react-helmet')
const Initializers = require('./components/Initializers/index')
const UrlQueryUpdater = require('./components/UrlQueryUpdater')

const AppErrorsDisplay = require('./components/AppErrorsDisplay')
const SelectedBudgetItem = require('./components/SelectedBudgetItem/index')

const Explore = React.createClass({
  render () {
    return (
      <div>
        <Helmet title='Explore' />
        <Initializers />
        <UrlQueryUpdater />

        <AppErrorsDisplay />

        <SelectedBudgetItem />
      </div>
    )
  }
})

module.exports = Explore
