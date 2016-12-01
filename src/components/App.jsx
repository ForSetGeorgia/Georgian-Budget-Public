const React = require('react')
const { Provider } = require('react-redux')
const { Router } = require('react-router')

const Routes = require('src/components/Routes')
const store = require('src/data/store')
const history = require('src/data/history')

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
