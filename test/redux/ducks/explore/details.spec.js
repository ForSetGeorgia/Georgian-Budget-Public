// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const wholeState = require('js/redux/initialState')

const exploreDetails = require('js/redux/ducks/explore/details')
const initialState = require('js/redux/initialState')

const {
  beginLoadingExploreDetails,
  finishLoadingExploreDetails
} = exploreDetails

const {
  getExploreDetails,
  getExploreDetailsLoading
} = exploreDetails

describe('explore details loading', () => {
  it('is false by default', () => {
    expect(getExploreDetailsLoading(wholeState)).to.be.false
  })

  it('reducer handles beginLoadingExploreDetails', () => {
    const initialExploreDetailsState = getExploreDetails(initialState)
    const previousState = Object.assign(
      {},
      initialExploreDetailsState,
      {
        loading: false
      }
    )

    const action = beginLoadingExploreDetails()

    const newState = exploreDetails(previousState, action)

    expect(newState).to.deep.eq(Object.assign(
      {},
      initialExploreDetailsState,
      {
        loading: true
      }
    ))
  })

  it('reducer handles finishLoadingExploreDetails', () => {
    const initialExploreDetailsState = getExploreDetails(initialState)
    const previousState = Object.assign(
      {},
      initialExploreDetailsState,
      {
        loading: true
      }
    )

    const action = finishLoadingExploreDetails()
    const newState = exploreDetails(previousState, action)

    expect(newState).to.deep.eq(Object.assign(
      {},
      initialExploreDetailsState,
      {
        loading: false
      }
    ))
  })
})
