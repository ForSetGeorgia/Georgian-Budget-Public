// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('src/data/initialState')
const explore = require('src/data/ducks/explore')

const {
  getExploreState,
  setDetailsItemId,
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
