// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const loading = require('js/redux/ducks/budgetItems/loading')
const { beginLoadingBudgetItems, finishLoadingBudgetItems } = loading

describe('data loading reducer', () => {
  it('handles beginLoadingBudgetItems', () => {
    const previousState = false

    const action = beginLoadingBudgetItems()

    expect(loading(previousState, action)).to.be.true
  })

  it('handles finishLoadingBudgetItems', () => {
    const previousState = true

    const action = finishLoadingBudgetItems()

    expect(loading(previousState, action)).to.be.false
  })
})
