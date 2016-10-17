// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const financeTypeFilter = require('js/ducks/filters/financeType')
const { setFinanceType } = financeTypeFilter
const initialState = require('js/initialState').filters.financeType

describe('finance type filter reducer', () => {
  it('handles setFinanceType action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        value: 'spent_finance'
      }
    )

    const action = setFinanceType('planned_finance')
    const newState = financeTypeFilter(previousState, action)

    const expectedState = {
      value: 'planned_finance'
    }

    expect(newState).to.deep.equal(expectedState)
  })
})
