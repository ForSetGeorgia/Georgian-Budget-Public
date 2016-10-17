// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItemTypeFilter = require('js/ducks/filters/budgetItemType')
const { setBudgetItemType } = budgetItemTypeFilter
const initialState = require('js/initialState').filters.budgetItemType

describe('budget item type filter reducer', () => {
  it('handles setBudgetItemType', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        value: 'total'
      }
    )

    const action = setBudgetItemType('program')
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
