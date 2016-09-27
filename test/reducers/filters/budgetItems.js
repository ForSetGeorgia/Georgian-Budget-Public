// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItemsFilter = require('../../../js/reducers/filters/budgetItems')
const initialState = require('../../../js/initialState').filters.budgetItems

describe('budget items filter reducer', () => {
  it('handles SELECT_BUDGET_ITEM_ID action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        selectedIds: [1]
      }
    )

    const action = {
      type: 'SELECT_BUDGET_ITEM_ID',
      id: 15
    }

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        selectedIds: [1, 15]
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })
})
