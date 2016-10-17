// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const loading = require('js/ducks/budgetItems/loading')
const { beginLoadingData, finishLoadingData } = loading

describe('data loading reducer', () => {
  it('handles beginLoadingData', () => {
    const previousState = false

    const action = beginLoadingData()

    expect(loading(previousState, action)).to.be.true
  })

  it('handles finishLoadingData', () => {
    const previousState = true

    const action = finishLoadingData()

    expect(loading(previousState, action)).to.be.false
  })
})
