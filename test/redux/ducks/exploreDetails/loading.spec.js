// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const wholeState = require('js/redux/initialState')

const loading = require('js/redux/ducks/exploreDetails/loading')
const { beginLoadingExploreDetails, finishLoadingExploreDetails } = loading

describe('explore details loading', () => {
  it('is false by default', () => {
    expect(loading.getExploreDetailsLoading(wholeState)).to.be.false
  })

  it('reducer handles beginLoadingExploreDetails', () => {
    const previousState = false

    const action = beginLoadingExploreDetails()

    expect(loading(previousState, action)).to.be.true
  })

  it('reducer handles finishLoadingExploreDetails', () => {
    const previousState = true

    const action = finishLoadingExploreDetails()

    expect(loading(previousState, action)).to.be.false
  })
})
