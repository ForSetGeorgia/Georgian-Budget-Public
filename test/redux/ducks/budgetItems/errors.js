// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const errors = require('js/redux/ducks/budgetItems/errors')
const { addBudgetItemsError, clearErrors } = errors
const initialState = require('js/redux/initialState').budgetItems.errors

describe('errors reducer', () => {
  it('handles addBudgetItemsError action for new error', () => {
    const previousState = initialState.concat([
      {
        text: 'Woo!',
        id: 1,
        show: true
      }
    ])

    const action = addBudgetItemsError('This is my error', 2)
    const newState = errors(previousState, action)

    const expectedState = previousState.concat({
      text: 'This is my error',
      id: 2,
      show: true
    })

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles addBudgetItemsError action for error with text that already exists', () => {
    const previousState = initialState.concat([
      {
        text: 'This is the same error',
        id: 1,
        show: true
      }
    ])

    const action = addBudgetItemsError('This is the same error')
    const newState = errors(previousState, action)

    expect(newState).to.deep.equal(previousState)
  })

  it('handles clearErrors action', () => {
    const previousState = initialState.concat([
      {
        text: 'This is my error',
        id: 1,
        show: true
      },
      {
        text: 'This is my other error',
        id: 2,
        show: false
      }
    ])

    const action = clearErrors()

    const newState = errors(previousState, action)

    var expectedState = []

    expect(newState).to.deep.equal(expectedState)
  })
})
