// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItemsFilter = require('../../../js/reducers/filters/budgetItems')
const initialState = require('../../../js/initialState').filters.budgetItems

describe('budget items filter reducer', () => {
  it('handles SET_SELECTED_BUDGET_ITEM_IDS action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        selectedIds: [1]
      }
    )

    const action = {
      type: 'SET_SELECTED_BUDGET_ITEM_IDS',
      ids: [4, 6, 1]
    }

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        selectedIds: [4, 6, 1]
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })
})
