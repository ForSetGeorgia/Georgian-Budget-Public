// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItemTypeFilter = require('../../../js/reducers/filters/budgetItemType')
const initialState = require('../../../js/initialState').filters.budgetItemType

describe('budget item type filter reducer', () => {
  it('handles SET_BUDGET_ITEM_TYPE', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        value: 'total'
      }
    )

    const action = {
      type: 'SET_BUDGET_ITEM_TYPE',
      value: 'program'
    }

    const newState = budgetItemTypeFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        value: 'program'
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })
})
