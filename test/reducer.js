// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const error = require('../js/reducers/error')
const initialState = require('../js/initialState').error

describe('error reducer', () => {
  it('handles SET_ERROR action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        text: '',
        show: false
      }
    )

    const action = {
      type: 'SET_ERROR',
      text: 'This is my error'
    }

    const newState = error(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        text: 'This is my error',
        show: true
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles CLEAR_ERROR action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        text: 'This is my super duper awesome error',
        show: true
      }
    )

    const action = {
      type: 'CLEAR_ERROR'
    }

    const newState = error(previousState, action)

    var expectedState = Object.assign(
      {},
      initialState,
      {
        text: '',
        show: false
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })
})
