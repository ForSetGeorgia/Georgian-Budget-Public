// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItems = require('js/redux/ducks/budgetItems')
const { setBudgetItems } = budgetItems
const { getBudgetItemsData } = budgetItems
const wholeState = require('js/redux/initialState')

describe('budget items reducer', () => {
  it('handles setBudgetItems action', () => {
    const initialState = getBudgetItemsData(wholeState)
    const previousState = Object.assign(
      [],
      initialState,
      [{
        id: '1',
        value: '2',
      }]
    )

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
