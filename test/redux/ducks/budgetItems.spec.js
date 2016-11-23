// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItems = require('js/redux/ducks/budgetItems')

const {
  mergeBudgetItems,
  markBudgetItemDetailsLoaded,
  getBudgetItemsData
} = budgetItems

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

  it('handles markBudgetItemDetailsLoaded action', () => {
    const initialState = getBudgetItemsData(wholeState)
    const previousState = Object.assign(
      {},
      initialState,
      {
        '1': {
          loaded: []
        },
        '2': {
          loaded: []
        }
      }
    )

    const action = markBudgetItemDetailsLoaded('1')
    const newState = budgetItems(previousState, action)

    expect(newState).to.deep.equal(Object.assign(
      {},
      initialState,
      {
        '1': {
          loaded: ['details']
        },
        '2': {
          loaded: []
        }
      }
    ))
  })
})
