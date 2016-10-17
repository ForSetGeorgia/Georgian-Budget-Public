// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItems = require('js/redux/ducks/budgetItems/data')
const { setBudgetItems } = budgetItems

describe('budget items reducer', () => {
  it('handles setBudgetItems action', () => {
    const previousState = [{
      id: '1',
      value: '2',
    }]

    const action = setBudgetItems([
      {
        id: 5
      },
      {
        id: 44,
        value: 6
      }
    ])

    const newState = budgetItems(previousState, action)

    const expectedState = [
      {
        id: 5
      },
      {
        id: 44,
        value: 6
      }
    ]

    expect(newState).to.deep.equal(expectedState)
  })
})
