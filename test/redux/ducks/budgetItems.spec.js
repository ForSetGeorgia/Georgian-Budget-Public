// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItems = require('js/redux/ducks/budgetItems')
const { mergeBudgetItems } = budgetItems
const { getBudgetItemsData } = budgetItems
const wholeState = require('js/redux/initialState')

describe('budget items reducer', () => {
  it('handles mergeBudgetItems action', () => {
    const initialState = getBudgetItemsData(wholeState)
    const previousState = Object.assign(
      {},
      initialState,
      {
        '1': {
          name: '5',
          value: '2'
        }
      }
    )

    const action = mergeBudgetItems({
      '1': {
        amount: '1'
      },
      'bla': {
        name: 'I am Bla'
      }
    })

    const newState = budgetItems(previousState, action)

    expect(newState).to.deep.equal({
      '1': {
        name: '5',
        value: '2',
        amount: '1'
      },
      'bla': {
        name: 'I am Bla'
      }
    })
  })
})
