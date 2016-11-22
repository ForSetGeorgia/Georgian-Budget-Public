// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const wholeState = require('js/redux/initialState')

const exploreDetails = require('js/redux/ducks/exploreDetails')

const { 
  beginLoadingExploreDetails,
  finishLoadingExploreDetails
} = exploreDetails

const { getExploreDetailsLoading } = exploreDetails

describe('explore details loading', () => {
  it('is false by default', () => {
    expect(getExploreDetailsLoading(wholeState)).to.be.false
  })

  it('reducer handles beginLoadingExploreDetails', () => {
    const previousState = false

    const action = beginLoadingExploreDetails()

    expect(exploreDetails(previousState, action)).to.be.true
  })

  it('reducer handles finishLoadingExploreDetails', () => {
    const previousState = true

    const action = finishLoadingExploreDetails()

    expect(exploreDetails(previousState, action)).to.be.false
  })
})
