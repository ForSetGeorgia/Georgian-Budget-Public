// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItems = require('js/data/ducks/budgetItems')

const {
  mergeBudgetItems,
  markBudgetItemDetailsLoaded,
  getBudgetItemsData
} = budgetItems

const wholeState = require('js/data/initialState')

describe('budget items reducer', () => {
  it('handles mergeBudgetItems action', () => {
    const initialState = getBudgetItemsData(wholeState)
    const previousState = Object.assign(
      {},
      initialState,
      {
        'fun': {
          woo: 'hoo'
        },
        '1': {
          ex: null,
          name: '5',
          value: '2',
          loaded: ['list']
        }
      }
    )

    const action = mergeBudgetItems({
      '1': {
        amount: '1',
        loaded: ['details']
      },
      'bla': {
        name: 'I am Bla'
      }
    })

    const newState = budgetItems(previousState, action)

    expect(newState).to.deep.equal({
      'fun': {
        woo: 'hoo'
      },
      '1': {
        ex: null,
        name: '5',
        value: '2',
        amount: '1',
        loaded: ['list', 'details']
      },
      'bla': {
        name: 'I am Bla'
      }
    })
  })
})
