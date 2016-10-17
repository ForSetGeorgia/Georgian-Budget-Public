// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const loading = require('js/ducks/data/loading')
const { beginLoadingData, finishLoadingData } = loading

describe('data loading reducer', () => {
  it('handles BEGIN_LOADING_DATA', () => {
    const previousState = false

    const action = beginLoadingData()

    expect(loading(previousState, action)).to.be.true
  })

  it('handles FINISH_LOADING_DATA', () => {
    const previousState = true

    const action = finishLoadingData()

    expect(loading(previousState, action)).to.be.false
  })
})
