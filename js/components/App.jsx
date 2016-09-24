const React = require('react')

const { Provider } = require('react-redux')
const BudgetItemSelect = require('./BudgetItemSelect')
const DataDisplay = require('./DataDisplay')

const store = require('../store')

const App = function () {
  return (
    <Provider store={store}>
      <main>
        <BudgetItemSelect />
        <DataDisplay />
      </main>
    </Provider>
  )
}

module.exports = App
