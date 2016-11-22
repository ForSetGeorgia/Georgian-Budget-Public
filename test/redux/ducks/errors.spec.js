// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const errors = require('js/redux/ducks/errors')
const { addError, clearErrors } = errors
const { getErrors } = errors
const wholeState = require('js/redux/initialState')

describe('errors reducer', () => {
  it('handles addError action for new error', () => {
    const initialState = getErrors(wholeState)
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

  it('handles addError action for error with text that already exists', () => {
    const initialState = getErrors(wholeState)
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

  it('handles clearErrors action', () => {
    const initialState = getErrors(wholeState)
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
