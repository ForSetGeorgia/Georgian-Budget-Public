// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const wholeState = require('js/redux/initialState')

const loading = require('js/redux/ducks/exploreDetails/loading')
const { beginLoadingBudgetItems, finishLoadingBudgetItems } = loading

describe('explore details loading', () => {
  it('is false by default', () => {
    expect(loading.getBudgetItemsLoading(wholeState)).to.be.false
  })

  it('reducer handles beginLoadingBudgetItems', () => {
    const previousState = false

    const action = beginLoadingBudgetItems()

    expect(loading(previousState, action)).to.be.true
  })

  it('reducer handles finishLoadingBudgetItems', () => {
    const previousState = true

    const action = finishLoadingBudgetItems()

    expect(loading(previousState, action)).to.be.false
  })
})
