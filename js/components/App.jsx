const React = require('react')
const { Provider } = require('react-redux')
const { Router } = require('react-router')

const Routes = require('./Routes')
const store = require('../store')
const history = require('../history')

const App = function () {
  return (
    <Provider store={store}>
      <Router history={history}>
        {Routes()}
      </Router>
    </Provider>
  )
}

module.exports = App
