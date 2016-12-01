// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const locale = require('src/data/ducks/locale')
const { setLocale } = locale

describe('locale reducer', () => {
  it('handles setLocale action', () => {
    const previousState = 'ka'

    const action = setLocale('en')

    const nextState = locale(previousState, action)

    expect(nextState).to.equal('en')
  })
})
