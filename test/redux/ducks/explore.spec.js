// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('js/redux/initialState')
const explore = require('js/redux/ducks/explore')

const {
  getExploreState,
  getListedItemIds,
  setExploreDisplay,
  setSelectedBudgetItemIds,
  setListedItemIds
} = explore

describe('explore reducer', () => {
  it('handles setSelectedBudgetItemIds action', () => {
    const initialExploreState = getExploreState(initialState)
    const previousState = Object.assign(
      {},
      initialExploreState,
      {
        selectedIds: ['a']
      }
    )

    const action = setSelectedBudgetItemIds(['b', 'c', 'd'])
    const newState = explore(previousState, action)

    const expectedState = Object.assign(
      {},
      initialExploreState,
      {
        selectedIds: ['b', 'c', 'd']
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles setExploreDisplay action', () => {
    const initialExploreState = getExploreState(initialState)
    const previousState = Object.assign(
      {},
      initialExploreState,
      {
        display: 'details'
      }
    )

    const action = setExploreDisplay('list')
    const newState = explore(previousState, action)

    expect(newState).to.deep.equal(Object.assign(
      {},
      initialExploreState,
      {
        display: 'list'
      }
    ))
  })

  it('handles setListedItemIds', () => {
    const initialExploreState = getExploreState(initialState)
    const previousState = Object.assign(
      {},
      initialExploreState,
      {
        listedItemIds: ['123', '4']
      }
    )

    const action = setListedItemIds(['5', '678'])
    const newState = explore(previousState, action)

    expect(newState).to.deep.eq(Object.assign(
      {},
      initialExploreState,
      {
        listedItemIds: ['5', '678']
      }
    ))
  })
})
