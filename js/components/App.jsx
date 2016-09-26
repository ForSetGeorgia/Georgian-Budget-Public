const React = require('react')
const { syncHistoryWithStore } = require('react-router-redux')

const { Provider } = require('react-redux')
const Routes = require('./Routes')

const { Router, browserHistory } = require('react-router')

const store = require('../store')
const history = syncHistoryWithStore(browserHistory, store)

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
