const React = require('react')

const { Provider } = require('react-redux')
const Explore = require('./Explore')
const Landing = require('./Landing')

const { Router, Route, IndexRoute, hashHistory } = require('react-router')

const store = require('../store')

const App = function () {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/ka'>
          <IndexRoute component={Landing} />
          <Route path='explore' component={Explore} />
        </Route>
      </Router>
    </Provider>
  )
}

module.exports = App
