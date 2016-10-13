const React = require('react')
const { Provider } = require('react-redux')
const { Router } = require('react-router')

const Routes = require('js/components/Routes')
const ConnectedIntlProvider = require('js/components/ConnectedIntlProvider')
const store = require('../store')
const history = require('../history')

const App = function () {
  return (
    <Provider store={store}>
      <ConnectedIntlProvider>
        <Router history={history}>
          {Routes()}
        </Router>
      </ConnectedIntlProvider>
    </Provider>
  )
}

module.exports = App
