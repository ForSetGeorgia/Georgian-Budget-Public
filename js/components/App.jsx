const React = require('react')
const { Provider } = require('react-redux')
const { Router } = require('react-router')

const Routes = require('js/components/Routes')
const store = require('js/redux/store')
const history = require('js/redux/history')

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
