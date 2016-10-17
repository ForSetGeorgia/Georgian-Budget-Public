// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const errors = require('js/ducks/data/errors')
const { addError, clearErrors } = errors
const initialState = require('js/initialState').data.errors

describe('errors reducer', () => {
  it('handles ADD_ERROR action for new error', () => {
    const previousState = initialState.concat([
      {
        text: 'Woo!',
        id: 1,
        show: true
      }
    ])

    const action = addError('This is my error', 2)
    const newState = errors(previousState, action)

    const expectedState = previousState.concat({
      text: 'This is my error',
      id: 2,
      show: true
    })

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles ADD_ERROR action for error with text that already exists', () => {
    const previousState = initialState.concat([
      {
        text: 'This is the same error',
        id: 1,
        show: true
      }
    ])

    const action = addError('This is the same error')
    const newState = errors(previousState, action)

    expect(newState).to.deep.equal(previousState)
  })

  it('handles CLEAR_ERRORS action', () => {
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
