const React = require('react')

const { Provider } = require('react-redux')
const Explore = require('./Explore')

const { Router, Route, hashHistory } = require('react-router')

const store = require('../store')

const App = function () {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/explore' component={Explore} />
      </Router>
    </Provider>
  )
}

module.exports = App
