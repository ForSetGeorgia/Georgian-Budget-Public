// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const messages = require('js/reducers/messages')

describe('messages reducer', () => {
  it('handles SET_MESSAGES action', () => {
    const previousState = {
      'message1': 'message content',
      'message2.fun': 'fun'
    }

    const newMessages = {
      'message5': 'stuff',
      'message8.fun.stuff': 'fun stuff!!!'
    }

    const action = {
      type: 'SET_MESSAGES',
      messages: newMessages
    }

    const nextState = messages(previousState, action)

    expect(nextState).to.equal(newMessages)
  })
})
