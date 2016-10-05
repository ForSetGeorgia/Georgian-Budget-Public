// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const locale = require('js/reducers/locale')

describe('locale reducer', () => {
  it('handles SET_LOCALE action', () => {
    const previousState = 'ka'

    const action = {
      type: 'SET_LOCALE',
      value: 'en'
    }

    const nextState = locale(previousState, action)

    expect(nextState).to.equal('en')
  })
})
