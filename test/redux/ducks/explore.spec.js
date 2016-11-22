// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('js/redux/initialState')
const explore = require('js/redux/ducks/explore')

const {
  getExploreState,
  setSelectedBudgetItemIds
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
})
