// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('js/data/initialState')
const explore = require('js/data/ducks/explore')

const {
  getExploreState,
  setExploreDisplay,
  setSelectedBudgetItemIds,
  markListLoaded
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

  it('handles markListLoaded action', () => {
    const initialExploreState = getExploreState(initialState)
    const previousState = Object.assign(
      {},
      initialExploreState,
      {
        listLoaded: ['program']
      }
    )

    const action = markListLoaded('priority')
    const newState = explore(previousState, action)

    expect(newState).to.deep.eq(Object.assign(
      {},
      initialExploreState,
      {
        listLoaded: ['program', 'priority']
      }
    ))
  })
})
