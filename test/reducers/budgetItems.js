// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItems = require('../../js/reducers/budgetItems')
const initialState = require('../../js/initialState').budgetItems

describe('budget items reducer', () => {
  it('handles SET_BUDGET_ITEMS action', () => {
    const previousState = [{
      id: '1',
      value: '2',
    }]

    const action = {
      type: 'SET_BUDGET_ITEMS',
      budgetItems: [
        {
          id: 5
        },
        {
          id: 44,
          value: 6
        }
      ]
    }

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

  it('handles SET_BUDGET_ITEM_TYPE action', () => {
    const previousState = [
      {
        id: 5555,
        value: 434
      },
      {
        id: 77,
        spent_finances: 11
      }
    ]

    const action = {
      type: 'SET_BUDGET_ITEM_TYPE',
      value: 'fun'
    }

    const newState = budgetItems(previousState, action)

    const expectedState = []

    expect(newState).to.deep.equal(expectedState)
  })
})
