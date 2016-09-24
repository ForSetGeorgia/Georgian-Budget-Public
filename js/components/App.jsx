const React = require('react')

const { Provider } = require('react-redux')
const Explore = require('./Explore')

const store = require('../store')

const App = function () {
  return (
    <Provider store={store}>
      <Explore />
    </Provider>
  )
}

module.exports = App
