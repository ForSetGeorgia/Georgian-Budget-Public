// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const wholeState = require('js/redux/initialState')

const exploreList = require('js/redux/ducks/explore/list')
const initialState = require('js/redux/initialState')

const { setListedItemIds } = exploreList
const { getExploreListState, getListedItemIds } = exploreList

describe('explore list reducer', () => {
  it('handles setListedItemIds', () => {
    const initialExploreListState = getExploreListState(initialState)
    const previousState = Object.assign(
      {},
      initialExploreListState,
      {
        listedItemIds: ['123', '4']
      }
    )

    const action = setListedItemIds(['5', '678'])
    const newState = exploreList(previousState, action)

    expect(newState).to.deep.eq(Object.assign(
      {},
      initialExploreListState,
      {
        listedItemIds: ['5', '678']
      }
    ))
  })
})
