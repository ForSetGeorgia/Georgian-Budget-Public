const React = require('react')

const { Provider } = require('react-redux')
const Routes = require('./Routes')

const { Router, hashHistory } = require('react-router')

const store = require('../store')

const App = function () {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        {Routes()}
      </Router>
    </Provider>
  )
}

module.exports = App
