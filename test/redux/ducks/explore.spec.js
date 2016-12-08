// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('src/data/initialState')
const explore = require('src/data/ducks/explore')

const {
  getExploreState,
  setExploreDisplay,
  setDetailsItemId,
  setParentItemId,
  markListLoaded
} = explore

describe('explore reducer', () => {
  it('handles setDetailsItemId action', () => {
    const initialExploreState = getExploreState(initialState)
    const previousState = Object.assign(
      {},
      initialExploreState,
      {
        detailsItemId: 'a'
      }
    )

    const action = setDetailsItemId('b')
    const newState = explore(previousState, action)

    const expectedState = Object.assign(
      {},
      initialExploreState,
      {
        detailsItemId: 'b'
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles setParentItemId action', () => {
    const initialExploreState = getExploreState(initialState)
    const previousState = Object.assign(
      {},
      initialExploreState,
      {
        parentItemId: 'a'
      }
    )

    const action = setParentItemId('b')
    const newState = explore(previousState, action)

    const expectedState = Object.assign(
      {},
      initialExploreState,
      {
        parentItemId: 'b'
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
