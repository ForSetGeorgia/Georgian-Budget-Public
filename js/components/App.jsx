const React = require('react')
const { createStore } = require('redux')

const { Provider } = require('react-redux')
const BudgetItemSelect = require('./BudgetItemSelect')
const DataDisplay = require('./DataDisplay')

const initialState = {
  budgetItems: [],
  error: ''
}

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case 'SET_ERROR': {
      return Object.assign(
        {},
        state,
        {
          error: action.error
        }
      )
    }
    case 'CLEAR_ERROR': {
      return Object.assign(
        {},
        state,
        {
          error: ''
        }
      )
    }
    case 'SET_BUDGET_ITEMS': {
      return Object.assign(
        {},
        state,
        {
          budgetItems: action.budgetItems
        }
      )
    }
  }
  return state
}

const store = createStore(
  reducer,
  initialState
)

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
