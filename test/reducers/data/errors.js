// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const errors = require('../../../js/reducers/data/errors')
const initialState = require('../../../js/initialState').data.errors

describe('errors reducer', () => {
  it('handles ADD_ERROR action', () => {
    const previousState = initialState.concat([
      {
        text: 'Woo!',
        id: 1,
        show: true
      }
    ])

    const action = {
      type: 'ADD_ERROR',
      id: 2,
      text: 'This is my error'
    }

    const newState = errors(previousState, action)

    const expectedState = previousState.concat({
      text: 'This is my error',
      id: 2,
      show: true
    })

    expect(newState).to.deep.equal(expectedState)
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

    const action = {
      type: 'CLEAR_ERRORS'
    }

    const newState = errors(previousState, action)

    var expectedState = []

    expect(newState).to.deep.equal(expectedState)
  })
})
